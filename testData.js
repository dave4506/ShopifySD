const testData = {
  "menus":[
    {
      "id":1,
      "data":"House",
      "child_ids":[3]
    },
    {
      "id":2,
      "data":"Company",
      "child_ids":[4]
    },
    {
      "id":3,
      "data":"Kitchen",
      "parent_id":1,
      "child_ids":[5]
    },
    {
      "id":4,
      "data":"Meeting Room",
      "parent_id":2,
      "child_ids":[6]
    },
    {
      "id":5,
      "data":"Sink",
      "parent_id":3,
      "child_ids":[1]
    },
    {
      "id":6,
      "data":"Chair",
      "parent_id":4,
      "child_ids":[]
    }
  ],
  "pagination":{
    "current_page":1,
    "per_page":5,
    "total":19
  }
}

module.exports = testData
