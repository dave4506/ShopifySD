# ShopifySD

Created by David Sun for 2018 Shopify Intern application.

## Installation + running program

```
npm i
npm run main

```

To run the code on 'Extra' dataset:

```
npm i
npm run extra

```

Note:

The final product is printed to terminal and displays menus as invalid or valid.

Each row displays the path taken through the menus (children key).

Ex:

```
root_id: 1 children: [ 4, 7, 20, 1 ]
```

The path begins at root_id of 1 and went to 4,7,20 and finally back to 1. This menu is deemed invalid due to its cyclical nature.
