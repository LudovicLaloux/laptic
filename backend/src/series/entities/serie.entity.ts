import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from "typeorm"
import { Workout } from "../../workouts/entities/workout.entity"
import { Exercice } from "../../exercices/entities/exercice.entity"
import { Repetition } from "../../repetitions/entities/repetition.entity"

@Entity()
export class Serie {
    @PrimaryGeneratedColumn()
    id: number

    @Column("int")
    restTime: number

    @Column("int")
    order: number

    @ManyToOne(
        () => Exercice,
        exercice => exercice.series,
    )
    exercice: Exercice

    @ManyToOne(
        () => Workout,
        workout => workout.series,
    )
    workout: Workout

    @OneToMany(
        () => Repetition,
        repetition => repetition.serie,
    )
    repetitions: Repetition[]
}
