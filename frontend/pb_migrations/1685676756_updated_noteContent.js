migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5sgz5lwp21hgb96")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gyqrvmy5",
    "name": "title",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5sgz5lwp21hgb96")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
