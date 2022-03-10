import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"

@Table
export class User extends Model<User> {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id: string

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    token: string

    @Column
    name: string

    @Column
    email: string

    @Column
    password: string
}
