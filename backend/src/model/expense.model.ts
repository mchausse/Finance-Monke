import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"

@Table
export class Expense extends Model<Expense> {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id: string

    @Column(DataType.DOUBLE)
    amount: number

    @Column
    category: string

    @Column
    date: string
}
