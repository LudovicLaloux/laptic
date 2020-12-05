import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, Connection } from "typeorm"
import { CreateExerciceDto } from "./dto/create-exercice.dto"
import { UpdateExerciceDto } from "./dto/update-exercice.dto"
import { Exercice } from "./entities/exercice.entity"

@Injectable()
export class ExercicesService {
    constructor(
        @InjectRepository(Exercice)
        private exerciceRepository: Repository<Exercice>,
        private connection: Connection,
    ) {}

    async create(createExerciceDto: CreateExerciceDto) {
        // get a connection and create a new query runner
        const queryRunner = this.connection.createQueryRunner()

        // establish real database connection using our new query runner
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const exercice = new Exercice()
            exercice.name = createExerciceDto.name
            exercice.equipements = createExerciceDto.equipements

            const response = await queryRunner.manager.save(exercice)
            await queryRunner.commitTransaction()
            return response
        } catch (error) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction()
            return error
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release()
        }
    }

    findAll(): Promise<Exercice[]> {
        return this.exerciceRepository.find()
    }

    findOne(id: number): Promise<Exercice> {
        return this.exerciceRepository.findOne(id)
    }

    async update(id: number, updateExerciceDto: UpdateExerciceDto) {
        // get a connection and create a new query runner
        const queryRunner = this.connection.createQueryRunner()

        // establish real database connection using our new query runner
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const exercice = await this.exerciceRepository.findOne(id)
            // if serie doesn't exist, throw error
            if (!exercice) {
                throw new HttpException(
                    "Exercice id doesn't exist",
                    HttpStatus.UNPROCESSABLE_ENTITY,
                )
            }
            exercice.name = updateExerciceDto.name
            exercice.equipements = updateExerciceDto.equipements

            const response = await queryRunner.manager.save(exercice)
            await queryRunner.commitTransaction()
            return response
        } catch (error) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction()
            return error
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release()
        }
    }

    async remove(id: number): Promise<void> {
        await this.exerciceRepository.delete(id)
    }
}
