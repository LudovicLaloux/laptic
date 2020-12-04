import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, HttpStatus, ValidationPipe } from "@nestjs/common"
import { WorkoutsService } from "./workouts.service"
import { CreateWorkoutDto } from "./dto/createWorkout.dto"
import { Workout } from "./entities/workout.entity"
import { UpdateWorkoutDto } from "./dto/updateWorkout.dto"

@Controller("workouts")
export class WorkoutsController {
    constructor(private readonly workoutsService: WorkoutsService) {}

    @Post()
    create(@Body() workoutData: CreateWorkoutDto): Promise<Workout> {
        return this.workoutsService.create(workoutData)
    }

    @Get()
    findAll() {
        return this.workoutsService.findAll()
    }

    @Get(":id")
    findOne(
        @Param("id")
        id: number
    ) {
        return this.workoutsService.findOne(id)
    }

    @Put(":id")
    update(
        @Param("id")
        id: number, 
        @Body() UpdateWorkoutDto: UpdateWorkoutDto
    ) {
        return this.workoutsService.update(id, UpdateWorkoutDto)
    }

    @Delete(":id")
    remove(
        @Param("id")
        id: number
    ) {
        return this.workoutsService.remove(id)
    }
}
