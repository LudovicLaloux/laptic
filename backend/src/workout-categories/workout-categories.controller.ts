import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common"
import { WorkoutCategoriesService } from "./workout-categories.service"
import { CreateWorkoutCategoryDto } from "./dto/create-workout-category.dto"
import { UpdateWorkoutCategoryDto } from "./dto/update-workout-category.dto"

@Controller("workout-categories")
export class WorkoutCategoriesController {
    constructor(
        private readonly workoutCategoriesService: WorkoutCategoriesService,
    ) {}

    @Post()
    create(@Body() createWorkoutCategoryDto: CreateWorkoutCategoryDto) {
        return this.workoutCategoriesService.create(createWorkoutCategoryDto)
    }

    @Get()
    findAll() {
        return this.workoutCategoriesService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.workoutCategoriesService.findOne(id)
    }

    @Put(":id")
    update(
        @Param("id") id: number,
        @Body() updateWorkoutCategoryDto: UpdateWorkoutCategoryDto,
    ) {
        return this.workoutCategoriesService.update(
            id,
            updateWorkoutCategoryDto,
        )
    }

    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.workoutCategoriesService.remove(id)
    }
}
