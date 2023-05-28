migrate((db) => {
  const collection = new Collection({
    "id": "ouoqyb55nepxa24",
    "created": "2023-05-27 17:45:54.896Z",
    "updated": "2023-05-27 17:45:54.896Z",
    "name": "note",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6eueyvsk",
        "name": "rowSpan",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "fcb7rjkg",
        "name": "columnSpan",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "i6kuqqfz",
        "name": "columnOffset",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "dmcxi9ib",
        "name": "data",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "unyeab0tujvajw4",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("ouoqyb55nepxa24");

  return dao.deleteCollection(collection);
})
