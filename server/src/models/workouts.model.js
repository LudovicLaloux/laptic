const db = require("../../config/db.config")

//workout object create
let Workout = function(workout) {
    this.id = workout.id
    this.name = employee.last_name
    this.bloc = employee.email
    this.created_date = new Date()
}

Workout.create = function(newWkt, result) {
    db.query("INSERT INTO workouts SET ?", newWkt, function(err, res) {
        if (err) {
            console.log("error: ", err)
            result(err, null)
        }
        else {
            console.log(res.insertId)
            result(null, res.insertId)
        }
    })
}

Workout.findById = function(id, result) {
    db.query("SELECT * FROM workouts WHERE id = ? ", id, function(err, res) {
        if (err) {
            console.log("error: ", err)
            result(err, null)
        }
        else {
            result(null, res)
        }
    })
}
Workout.findAll = function(result) {
    db.query("SELECT * FROM workouts", function(err, res) {
        if (err) {
            console.log("error: ", err)
            result(null, err)
        }
        else {
            console.log("workouts : ", res)
            result(null, res)
        }
    })
}
Workout.update = function(id, employee, result) {
    db.query(
        "UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?",
        [
            employee.first_name,
            employee.last_name,
            employee.email,
            employee.phone,
            employee.organization,
            employee.designation,
            employee.salary,
            id,
        ],
        function(err, res) {
            if (err) {
                console.log("error: ", err)
                result(null, err)
            }
            else {
                result(null, res)
            }
        }
    )
}
Employee.delete = function(id, result) {
    db.query("DELETE FROM employees WHERE id = ?", [id], function(err, res) {
        if (err) {
            console.log("error: ", err)
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

module.exports = Workout
