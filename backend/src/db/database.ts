import { Sequelize } from 'sequelize-typescript'
import { Transaction } from '../model/transaction.model'
import { User } from '../model/user.model'

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
sequelize.addModels([User])

export default {
    sequelize,
    Transaction,
    User
}