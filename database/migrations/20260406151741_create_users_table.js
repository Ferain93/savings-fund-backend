exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('email', 255).notNullable().unique()
    table.string('password_hash', 255).notNullable()
    table.integer('role_id').unsigned().notNullable()
    table.boolean('is_active').notNullable().defaultTo(true)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table
      .foreign('role_id')
      .references('id')
      .inTable('roles')
      .onDelete('RESTRICT')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
