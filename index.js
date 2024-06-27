const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 5500;

// Middleware para analizar datos URL-encoded y JSON
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'codo-a-codo'
});

// Conexión a la base de datos MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL.');
});

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi aplicación Node.js con Express y MySQL!');
});

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).send('Error al obtener los usuarios');
      return;
    }
    res.json(results);
  });
});

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
  const { fname, lname, email, birthday, telefono, interes, level } = req.body;
  const query = 'INSERT INTO users (fname, lname, email, birthday, telefono, interes, level) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [fname, lname, email, birthday, telefono, interes, level], (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).send('Error al crear el usuario');
      return;
    }
    res.json({ id: results.insertId, ...req.body });
  });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
