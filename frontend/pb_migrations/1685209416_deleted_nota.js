migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("5aggpghra806lxy");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "5aggpghra806lxy",
    "created": "2023-05-26 23:38:27.043Z",
    "updated": "2023-05-26 23:38:27.043Z",
    "name": "nota",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fejgntpa",
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
        "id": "cpgltrtw",
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
})
