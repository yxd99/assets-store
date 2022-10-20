import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('titles')
export class Title {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100
  })
  name: string

  @Column({
    type: 'date',
  })
  releaseDate: string;

  @Column({
    type: 'varchar',
    length: 40
  })
  productionCompany: string

  @DeleteDateColumn({
    select: false
  })
  dateRemoved: string;
}
