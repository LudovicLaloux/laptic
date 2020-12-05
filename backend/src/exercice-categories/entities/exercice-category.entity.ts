import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Exercice } from "../../exercices/entities/exercice.entity"

@Entity()
export class ExerciceCategory {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 45 })
    name: string

    @OneToMany(
        () => Exercice,
        exercice => exercice.category,
    )
    exercices: Exercice[]
}
