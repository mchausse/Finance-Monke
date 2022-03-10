import { Sequelize } from 'sequelize-typescript'
import { Transaction } from '../model/transaction.model'

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

sequelize.addModels([Transaction])

export default {
    sequelize,
    Transaction
}