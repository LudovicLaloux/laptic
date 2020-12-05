import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { RepetitionsService } from "./repetitions.service"
import { RepetitionsController } from "./repetitions.controller"
import { Repetition } from "./entities/repetition.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Repetition])],
    controllers: [RepetitionsController],
    providers: [RepetitionsService],
})
export class RepetitionsModule {}
