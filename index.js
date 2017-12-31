const data = require('./testData')
const _ = require('lodash')
const rp = require('request-promise');

const processData = (menus) => {
  const paths = _.flatten([].concat(menus).map((m) => {
    return createMenuPaths(m.id,menus);
  }))
  const returnPayload = _.groupBy(paths,determineCyclical);
  if (returnPayload.invalid_menus == null) returnPayload.invalid_menus = []
  if (returnPayload.valid_menus == null) returnPayload.valid_menus = []
  returnPayload.invalid_menus = returnPayload.invalid_menus.map(convertToFormat)
  returnPayload.valid_menus = returnPayload.valid_menus.map(convertToFormat)
  console.log("invalid_menus",returnPayload.invalid_menus.length,":");
  returnPayload.invalid_menus.forEach((m)=>{
    console.log("root_id:",m.root_id,"children:",m.children);
  })
  console.log("valid_menus",returnPayload.valid_menus.length,":");
  returnPayload.valid_menus.forEach((m)=>{
    console.log("root_id:",m.root_id,"children:",m.children);
  })
  return returnPayload
}

const convertToFormat = (path) => {
    var newPath = path.slice(1);
    return { "root_id":path[0], "children":newPath}
}

const createMenuPaths = (rid,ms,paths=[],depth = 1) => {
  const i = _.findIndex(ms,['id',rid]);
  var newPaths = [];
  if (depth > 4 || ms[i].child_ids.length == 0)
    return [[rid]];
  ++depth
  newPaths = _.flatten([].concat(ms[i].child_ids).map((cid) => {
    return createMenuPaths(cid,ms,paths,depth);
  }))
  if (newPaths.length == 0) newPaths = [[]];
  return newPaths.map(p => { return [rid, ...p]})
}

const determineCyclical = (p) => {
  return _.findLastIndex(p,c => p[0] == c) != 0 ? "invalid_menus":"valid_menus";
}

const generateOptions = (id,page) => {
  return {
      uri: 'https://backend-challenge-summer-2018.herokuapp.com/challenges.json',
      qs: {
          id,page
      },
      headers: {},
      json: true
  };
}

const processMenus = (id) => {
  return rp(generateOptions(id,1))
      .then(function (data) {
          let length = Math.floor(data.pagination.total / data.pagination.per_page) + 1
          const promises = Array.apply(null, Array(length)).map((_,i)=>{
            return rp(generateOptions(id,i + 1))
          })
          return Promise.all(promises);
      })
      .then((menuPages) => {
        return _.flatten(menuPages.map((m)=>{ return m.menus }))
      })
      .then((menus)=>{
        processData(menus)
      })
}

processMenus(process.argv[2] || 1);
