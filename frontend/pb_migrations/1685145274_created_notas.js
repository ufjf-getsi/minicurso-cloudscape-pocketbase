migrate((db) => {
  const collection = new Collection({
    "id": "dbwyft1i7kv4a9i",
    "created": "2023-05-26 23:54:33.951Z",
    "updated": "2023-05-26 23:54:33.951Z",
    "name": "notas",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wwrvj5xl",
        "name": "data",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "5aggpghra806lxy",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "pfqw4wdt",
        "name": "columnOffset",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "wbbadd1g",
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
        "id": "ctchbhn5",
        "name": "columnSpan",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dbwyft1i7kv4a9i");

  return dao.deleteCollection(collection);
})
