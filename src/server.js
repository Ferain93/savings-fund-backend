require('dotenv').config();
const app = require('./app');
const db = require('../database/connection');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await db.raw('SELECT 1');
    console.log('✓ MySQL conectado');
    app.listen(PORT, () => {
      console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('✗ Error al conectar a MySQL:', err.message);
    process.exit(1);
  }
}

start();