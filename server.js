
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de conexión a Azure SQL
// Se recomienda usar la cadena de conexión completa desde process.env.DB_URL
const dbConfig = process.env.DB_URL;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Tayta API is running' });
});

// Endpoint para obtener productos desde Azure
app.get('/api/productos', async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query('SELECT * FROM Productos WHERE Eliminado = 0');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error en Azure SQL:', err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para obtener clientes
app.get('/api/clientes', async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query('SELECT * FROM Clientes');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para login (Ejemplo básico)
app.post('/api/auth/login', async (req, res) => {
  const { usuario, clave } = req.body;
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('u', sql.VarChar, usuario)
      .input('p', sql.VarChar, clave)
      .query('SELECT * FROM Empleados WHERE Usuario = @u AND Clave = @p');
    
    if (result.recordset.length > 0) {
      res.json({ success: true, user: result.recordset[0] });
    } else {
      res.status(401).json({ success: false, error: 'Credenciales incorrectas' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor Tayta corriendo en puerto ${PORT}`);
});
