import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { WorkoutCategoriesService } from "./workout-categories.service"
import { WorkoutCategoriesController } from "./workout-categories.controller"
import { WorkoutCategory } from "./entities/workout-category.entity"

@Module({
    imports: [TypeOrmModule.forFeature([WorkoutCategory])],
    controllers: [WorkoutCategoriesController],
    providers: [WorkoutCategoriesService],
})
export class WorkoutCategoriesModule {}
