import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Serie } from "../../series/entities/serie.entity"

@Entity()
export class Repetition {
    @PrimaryGeneratedColumn()
    id: number

    @Column("int", { nullable: true })
    repNumber: number

    @Column("varchar", { length: 45, nullable: true })
    repTime: string

    @Column("int")
    rest: number

    @Column("int")
    order: number

    @ManyToOne(
        type => Serie,
        serie => serie.repetitions,
    )
    serie: Serie
}
