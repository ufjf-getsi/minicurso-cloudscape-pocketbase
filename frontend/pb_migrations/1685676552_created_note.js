migrate((db) => {
  const collection = new Collection({
    "id": "99i3ojltae0ryek",
    "created": "2023-06-02 03:29:12.790Z",
    "updated": "2023-06-02 03:29:12.790Z",
    "name": "note",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cclnw2bo",
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
        "id": "x27ykekn",
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
        "id": "p5igxcap",
        "name": "columnOffset",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "hsgmthvc",
        "name": "data",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "5sgz5lwp21hgb96",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("99i3ojltae0ryek");

  return dao.deleteCollection(collection);
})
