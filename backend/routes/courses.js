const express = require("express")
const router = express.Router()
const db = require("../db")

// gets all courses
router.get("/", (req, res) => {
	let sql = "SELECT * from courses"

	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured."
			})
		} else {
			res.json(rows) 
		}
	})
})

router.get("/courseName", (req, res) => {
	let keyword = req.query.keyword
	let sql
	if (keyword) {
		sql =  `SELECT * from courses WHERE course_name LIKE "%${keyword}%"`
	} else {
		sql = "SELECT * from courses"
	}

	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured."
			})
		} else {
			res.json(rows) 
		}
	})
})

router.get("/courseID", (req, res) => {
	let sql = `SELECT * from courses WHERE course_id="${req.body.courseID}"`

	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured."
			})
		} else {
			res.json(rows) 
		}
	})
})

router.post("/createCourse", (req, res) => {
	let sql = `INSERT INTO courses VALUES ( \
		"${req.body.courseID}", \
		"${req.body.courseName}", \
		"${req.body.courseSummary}", \
		${req.body.hasPrereq}
	)`

	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured.",
				sql: sql
			})
		} else {
			res.status(200).send({
				message: `${req.body.courseID} ${req.body.courseName} inserted to courses table`
			})
		}
	})
})

router.post("/editCourse", (req, res) => {
	let sql = `UPDATE courses SET \
		courseName = "${req.body.courseName}", \
		class = "${req.body.class}", \
		size = ${req.body.size}, \
		trainer = "${req.body.trainer}", \
		enrolmentStart = "${req.body.enrolmentStart}", \
		enrolmentEnd = "${req.body.enrolmentEnd}", \
		startDate = "${req.body.startDate}", \
		endDate = "${req.body.endDate}"
		WHERE courseID = "${req.body.courseID}"`

	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured.",
				sql: sql
			})
		} else {
			res.status(200).send({
				message: `${req.body.courseID} ${req.body.courseName} edited.`
			})
		}
	})
})

module.exports = router