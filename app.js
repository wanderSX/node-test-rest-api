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

app.get('/api/users/:id', (req, res) => {
	let userId = req.params.id;
	
	connection.query("SELECT * FROM users WHERE id = ?", [userId], (error, result, fields) => {
		if (error) {
			res.status(400).json({
				message: error.message
			});
		}

		res.status(200).send(result);
	})
});

app.post('/api/users', (req, res) => {
	let newUser = {
		name: req.body.name,
		surname: req.body.surname
	};

	connection.query("INSERT INTO users SET ?", user, (error, result, fields) => {
		if (error) {
			res.status(400).send(error.message);
		}

		res.status(200).send(result);
	});
});

app.put('/api/users/:id', (req, res) => {
	let userId = req.params.id;
	let newName = req.body.name;

	connection.query("UPDATE users SET name = ? WHERE id = ?", [newName, userId], (error, result, fields) => {
		if (error) {
			res.status(400).send(error.message);
		}

		res.status(200).send(result);
	});
});

app.listen(3000);
