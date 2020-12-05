import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, Connection } from "typeorm"
import { CreateExerciceCategoryDto } from "./dto/create-exercice-category.dto"
import { UpdateExerciceCategoryDto } from "./dto/update-exercice-category.dto"
import { ExerciceCategory } from "./entities/exercice-category.entity"

@Injectable()
export class ExerciceCategoriesService {
    constructor(
        @InjectRepository(ExerciceCategory)
        private exerciceCategoryRepository: Repository<ExerciceCategory>,
        private connection: Connection,
    ) {}

    async create(createExerciceCategoryDto: CreateExerciceCategoryDto) {
        // get a connection and create a new query runner
        const queryRunner = this.connection.createQueryRunner()

        // establish real database connection using our new query runner
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const exerciceCategory = new ExerciceCategory()
            exerciceCategory.name = createExerciceCategoryDto.name

            const response = await queryRunner.manager.save(exerciceCategory)
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

    findAll(): Promise<ExerciceCategory[]> {
        return this.exerciceCategoryRepository.find()
    }

    findOne(id: number): Promise<ExerciceCategory> {
        return this.exerciceCategoryRepository.findOne(id, {
            relations: ["exercices"],
        })
    }

    async update(
        id: number,
        updateExerciceCategoryDto: UpdateExerciceCategoryDto,
    ) {
        // get a connection and create a new query runner
        const queryRunner = this.connection.createQueryRunner()

        // establish real database connection using our new query runner
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const category = await this.exerciceCategoryRepository.findOne(id)
            // if category doesn't exist, throw error
            if (!category) {
                throw new HttpException(
                    "Exercice category id doesn't exist",
                    HttpStatus.UNPROCESSABLE_ENTITY,
                )
            }
            category.name = updateExerciceCategoryDto.name

            const response = await queryRunner.manager.save(category)
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
        await this.exerciceCategoryRepository.delete(id)
    }
}
