const bcrypt = require('bcryptjs')

exports.seed = async function (knex) {
  // Limpiar en orden inverso por FK
  await knex('members').del()
  await knex('users').del()
  await knex('roles').del()

  // Roles
  await knex('roles').insert([
    { id: 1, name: 'admin' },
    { id: 2, name: 'socio' },
  ])

  const passwordHash = await bcrypt.hash('password123', 10)

  // Users
  await knex('users').insert([
    {
      email: 'admin@savingsfund.com',
      password_hash: passwordHash,
      role_id: 1,
    },
    {
      email: 'socio1@savingsfund.com',
      password_hash: passwordHash,
      role_id: 2,
    },
    {
      email: 'socio2@savingsfund.com',
      password_hash: passwordHash,
      role_id: 2,
    },
  ])

  // Members
  const users = await knex('users').select('id', 'email')
  const byEmail = Object.fromEntries(users.map((u) => [u.email, u.id]))

  await knex('members').insert([
    {
      user_id: byEmail['admin@savingsfund.com'],
      full_name: 'Administrador Principal',
      phone: '3001234567',
      status: 'active',
    },
    {
      user_id: byEmail['socio1@savingsfund.com'],
      full_name: 'María García',
      phone: '3109876543',
      status: 'active',
    },
    {
      user_id: byEmail['socio2@savingsfund.com'],
      full_name: 'Carlos López',
      phone: null,
      status: 'pending',
    },
  ])
}
