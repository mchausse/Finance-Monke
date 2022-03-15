import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"

@Table
export class Transaction extends Model<Transaction> {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id: string

    @Column(DataType.UUID)
    token: string

    @Column(DataType.DOUBLE)
    amount: number

    @Column
    category: string

    @Column
    date: string

    @Column(({
        type: DataType.BOOLEAN,
        defaultValue: true
    }))
    isExpense: boolean
}
