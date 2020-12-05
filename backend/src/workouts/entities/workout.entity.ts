import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
} from "typeorm"
import { Serie } from "../../series/entities/serie.entity"
import { WorkoutCategory } from "../../workout-categories/entities/workout-category.entity"

@Entity()
export class Workout {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 200 })
    name: string

    @Column("date")
    date: string

    @OneToMany(
        type => Serie,
        serie => serie.workout,
    )
    series: Serie[]

    @ManyToOne(
        type => WorkoutCategory,
        category => category.workouts,
    )
    category: WorkoutCategory
}
