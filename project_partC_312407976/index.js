const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const CRUD = require('./CRUD');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
	res.render('login');
})

app.get('/register', (req, res) => {
	res.render('register');
})

app.get('/dashboard/:id', CRUD.getProfile);

app.get('/courts/:id', CRUD.showCourts);

app.post('/register', CRUD.register);

app.post('/login', CRUD.login);

app.post('/createOrder/:id', CRUD.createOrder);

CRUD.createAllTables();
CRUD.insertCourtsFromCSV();

app.listen(PORT, () => {
	console.log(`server is running on PORT ${PORT}`);
})

