import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"

@Table
export class Expense extends Model<Expense> {

    @PrimaryKey
    @Column
    id: number

    @Column(DataType.DOUBLE)
    amount: number

    @Column
    category: string

    @Column
    date: string
}
