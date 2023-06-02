migrate((db) => {
  const collection = new Collection({
    "id": "5sgz5lwp21hgb96",
    "created": "2023-06-02 03:27:24.865Z",
    "updated": "2023-06-02 03:27:24.865Z",
    "name": "noteContent",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gyqrvmy5",
        "name": "tittle",
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
        "id": "xvspuxk8",
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
  const collection = dao.findCollectionByNameOrId("5sgz5lwp21hgb96");

  return dao.deleteCollection(collection);
})
