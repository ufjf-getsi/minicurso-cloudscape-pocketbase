migrate((db) => {
  const collection = new Collection({
    "id": "unyeab0tujvajw4",
    "created": "2023-05-27 17:45:32.570Z",
    "updated": "2023-05-27 17:45:32.570Z",
    "name": "noteContent",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "buywi5nf",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ipuj8dkk",
        "name": "content",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("unyeab0tujvajw4");

  return dao.deleteCollection(collection);
})
