exports.up = function (knex) {
  return knex.schema.createTable('members', (table) => {
    table.increments('id').primary()
    table.integer('user_id').unsigned().notNullable().unique()
    table.string('full_name', 255).notNullable()
    table.string('phone', 20).nullable()
    table.enum('status', ['active', 'inactive', 'pending']).defaultTo('pending')
    table.timestamp('joined_at').defaultTo(knex.fn.now())

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('members')
}
