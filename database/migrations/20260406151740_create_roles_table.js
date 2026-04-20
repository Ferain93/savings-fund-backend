exports.up = function (knex) {
  return knex.schema.createTable('roles', (table) => {
    table.increments('id').primary()
    table.enu('name', ['admin', 'socio']).notNullable().unique()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('roles')
}
