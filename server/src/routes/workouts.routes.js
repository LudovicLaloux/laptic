const express = require("express")
const router = express.Router()
const workoutsController = require("../controllers/workouts.controller")

// Retrieve all employees
router.get("/api/workouts", employeeController.findAll)

// Create a new employee
router.post("/api/workouts", employeeController.create)

// Retrieve a single employee with id
router.get("/api/workouts/:id", employeeController.findById)

// Update a employee with id
router.put("/api/workouts/:id", employeeController.update)

// Delete a employee with id
router.delete("/api/workouts/:id", employeeController.delete)

module.exports = router