import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ExercicesService } from "./exercices.service"
import { ExercicesController } from "./exercices.controller"
import { Exercice } from "./entities/exercice.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Exercice])],
    controllers: [ExercicesController],
    providers: [ExercicesService],
})
export class ExercicesModule {}
