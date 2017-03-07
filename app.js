const express = require('express');
const mysql = require('mysql');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let connection = mysql.createConnection({
	host:'localhost',
	user: 'root',
	password: 'goldenkey',
	database: 'testdb'
});

connection.connect((error) => {
	if (error) {
		console.log('Error');
		return;
	}
		console.log('Connected');
});

app.get('/api/users', (req, res) => {
	connection.query("SELECT * FROM users", (error, result, fields) => {
		if (error) {
			res.status(400).json({
				message: error.message
			});
		}

		res.send(result);
	});

});

app.listen(3000);
