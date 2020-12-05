import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, Connection } from "typeorm"
import { CreateRepetitionDto } from "./dto/create-repetition.dto"
import { UpdateRepetitionDto } from "./dto/update-repetition.dto"
import { Repetition } from "./entities/repetition.entity"

@Injectable()
export class RepetitionsService {
    constructor(
        @InjectRepository(Repetition)
        private repetitionRepository: Repository<Repetition>,
        private connection: Connection,
    ) {}

    async create(createRepetitionDto: CreateRepetitionDto) {
        // get a connection and create a new query runner
        const queryRunner = this.connection.createQueryRunner()

        // establish real database connection using our new query runner
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const repetition = new Repetition()
            repetition.repNumber = createRepetitionDto.repNumber
            repetition.repTime = createRepetitionDto.repTime
            repetition.rest = createRepetitionDto.rest
            repetition.order = createRepetitionDto.order

            const response = await queryRunner.manager.save(repetition)
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

    findAll(): Promise<Repetition[]> {
        return this.repetitionRepository.find()
    }

    findOne(id: number): Promise<Repetition> {
        return this.repetitionRepository.findOne(id)
    }

    async update(id: number, updateRepetitionDto: UpdateRepetitionDto) {
        // get a connection and create a new query runner
        const queryRunner = this.connection.createQueryRunner()

        // establish real database connection using our new query runner
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const repetition = await this.repetitionRepository.findOne(id)
            // if serie doesn't exist, throw error
            if (!repetition) {
                throw new HttpException(
                    "Repetition id doesn't exist",
                    HttpStatus.UNPROCESSABLE_ENTITY,
                )
            }
            repetition.repNumber = updateRepetitionDto.repNumber
            repetition.repTime = updateRepetitionDto.repTime
            repetition.rest = updateRepetitionDto.rest
            repetition.order = updateRepetitionDto.order

            const response = await queryRunner.manager.save(repetition)
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
        await this.repetitionRepository.delete(id)
    }
}
