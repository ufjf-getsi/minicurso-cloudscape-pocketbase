migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ouoqyb55nepxa24")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dmcxi9ib",
    "name": "data",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "unyeab0tujvajw4",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ouoqyb55nepxa24")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
