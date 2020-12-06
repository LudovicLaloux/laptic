import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Workout } from "../../workouts/entities/workout.entity"
import { Exercice } from "../../exercices/entities/exercice.entity"

@Entity()
export class Serie {
    @PrimaryGeneratedColumn()
    id: number

    @Column("int")
    restTime: number

    @Column("int")
    order: number

    @Column("int")
    repNumber: number

    @Column("varchar", { length: 45 })
    repTime: string

    @ManyToOne(
        () => Exercice,
        exercice => exercice.series,
    )
    exercice: Exercice

    @ManyToOne(
        type => Workout,
        workout => workout.series,
    )
    workout: Workout
}
