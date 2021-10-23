const express = require("express")
const router = express.Router()
const db = require("../db")

router.get("/", (req, res) => {
	let sql = "SELECT * from quiz_questions"

	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured."
			})
		} else {
			// array of rows are already in the format of "data": []
			res.json(rows) 
		}
	})
})

router.post('/createQuestion', (req, res) => {
	let sql = `INSERT INTO quiz_questions VALUES ( \
		'${req.body.quiz_id}', \
		'${req.body.question_id}', \
		'${req.body.question}', \
		'${req.body.type}', \
		'${req.body.duration}', \
		'${req.body.option1}', \
		'${req.body.option2}', \ 
		'${req.body.option3}', \
		'${req.body.option4}', \
		'${req.body.answer}'
	)`
	

	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured.",
				sql: sql
			})
		} else {
			console.log("1 record inserted to question table")
		}
	})
})

module.exports = router