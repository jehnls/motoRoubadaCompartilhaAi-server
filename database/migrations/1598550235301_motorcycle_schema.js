'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MotorcycleSchema extends Schema {
  up() {
    this.create('motorcycles', (table) => {
      table.increments()
      table
        .interger('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('model').notNullable()
      table.string('plate').notNullable()
      table.string('characteristic')
      table.string('description_theft')
      table.string('location_theft')
      table.timestamps()
    })
  }

  down() {
    this.drop('motorcycles')
  }
}

module.exports = MotorcycleSchema
