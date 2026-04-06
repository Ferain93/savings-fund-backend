exports.seed = async function (knex) {
  // Limpiar en orden inverso por FK
  await knex('members').del();
  await knex('users').del();
  await knex('roles').del();

  // Roles
  await knex('roles').insert([
    { id: 1, name: 'admin' },
    { id: 2, name: 'socio' },
  ]);

  // Users (passwords hasheadas con bcrypt — estos son placeholders)
  await knex('users').insert([
    {
      email: 'admin@savingsfund.com',
      password_hash: '$2b$10$placeholder_admin_hash',
      role_id: 1,
    },
    {
      email: 'socio1@savingsfund.com',
      password_hash: '$2b$10$placeholder_socio1_hash',
      role_id: 2,
    },
    {
      email: 'socio2@savingsfund.com',
      password_hash: '$2b$10$placeholder_socio2_hash',
      role_id: 2,
    },
  ]);

  // Members
  const users = await knex('users').select('id', 'email');
  const byEmail = Object.fromEntries(users.map(u => [u.email, u.id]));

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
  ]);
};
