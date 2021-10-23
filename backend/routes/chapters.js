const express = require("express")
const router = express.Router()
const db = require("../db")


// gets all courses
router.get("/", (req, res) => {
	let sql = "select * from course_materials"

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


// post new chapter to db
router.post("/addChapter", (req, res) => {
	let sql = `INSERT INTO course_materials VALUES ( \
		"${req.body.courseID}", \
		"${req.body.classID}", \
		"${req.body.chapNum}", \
        "${req.body.content}", \
		${req.body.quizID}
	)`

	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured.",
				sql: sql
			})
            console.log(sql)
		} else {
			console.log("1 record inserted to course_materials table")
		}
	})
})

module.exports = router