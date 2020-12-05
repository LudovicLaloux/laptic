import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common"
import { ExerciceCategoriesService } from "./exercice-categories.service"
import { CreateExerciceCategoryDto } from "./dto/create-exercice-category.dto"
import { UpdateExerciceCategoryDto } from "./dto/update-exercice-category.dto"

@Controller("exercice-categories")
export class ExerciceCategoriesController {
    constructor(
        private readonly exerciceCategoriesService: ExerciceCategoriesService,
    ) {}

    @Post()
    create(@Body() createExerciceCategoryDto: CreateExerciceCategoryDto) {
        return this.exerciceCategoriesService.create(createExerciceCategoryDto)
    }

    @Get()
    findAll() {
        return this.exerciceCategoriesService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.exerciceCategoriesService.findOne(id)
    }

    @Put(":id")
    update(
        @Param("id") id: number,
        @Body() updateExerciceCategoryDto: UpdateExerciceCategoryDto,
    ) {
        return this.exerciceCategoriesService.update(
            id,
            updateExerciceCategoryDto,
        )
    }

    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.exerciceCategoriesService.remove(id)
    }
}
