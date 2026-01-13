
import express from 'express';
import sql from 'mssql';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// Configuración de CORS
app.use(cors());
app.use(express.json());

// Configuración de conexión a Azure SQL
// Se obtiene de la variable de entorno DB_URL configurada en Render
const dbConfig = process.env.DB_URL;

/**
 * Endpoint de Salud
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Tayta API is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * Obtener Productos
 */
app.get('/api/productos', async (req, res) => {
  try {
    if (!dbConfig) throw new Error("DB_URL no está configurada");
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query('SELECT * FROM Productos WHERE Eliminado = 0');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error en Azure SQL (Productos):', err.message);
    res.status(500).json({ error: 'Error al consultar productos', details: err.message });
  }
});

/**
 * Obtener Clientes
 */
app.get('/api/clientes', async (req, res) => {
  try {
    if (!dbConfig) throw new Error("DB_URL no está configurada");
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query('SELECT * FROM Clientes');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error en Azure SQL (Clientes):', err.message);
    res.status(500).json({ error: 'Error al consultar clientes', details: err.message });
  }
});

/**
 * Login de Usuarios
 */
app.post('/api/auth/login', async (req, res) => {
  const { usuario, clave } = req.body;
  try {
    if (!dbConfig) throw new Error("DB_URL no está configurada");
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
    console.error('Error en Azure SQL (Auth):', err.message);
    res.status(500).json({ error: 'Error de autenticación', details: err.message });
  }
});

// Render asigna un puerto automáticamente en process.env.PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor Tayta corriendo en puerto ${PORT}`);
  console.log(`📡 Esperando conexiones de Azure SQL...`);
});
