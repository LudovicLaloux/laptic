import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ExerciceCategoriesService } from "./exercice-categories.service"
import { ExerciceCategoriesController } from "./exercice-categories.controller"
import { ExerciceCategory } from "./entities/exercice-category.entity"

@Module({
    imports: [TypeOrmModule.forFeature([ExerciceCategory])],
    controllers: [ExerciceCategoriesController],
    providers: [ExerciceCategoriesService],
})
export class ExerciceCategoriesModule {}
