const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

connection.connect(async (err) => {
	if (err) console.log(err)
	console.log("succefuly connected to DB");
});

module.exports = connection;