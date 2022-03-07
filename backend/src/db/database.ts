import { Sequelize } from 'sequelize-typescript'
import { Expense } from '../model/expense.model'

const sequelize = new Sequelize(
    'postgres',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        dialectOptions: {}
    })

sequelize.addModels([Expense])

export default {
    sequelize,
    Expense
}