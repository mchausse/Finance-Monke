import { Sequelize, Model, DataTypes } from '@sequelize/core'

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

class User extends Model {
    declare id: string
    declare token: string
    declare name: string
    declare email: string
    declare password: string
}

class Transaction extends Model {
    declare id: string
    declare amount: number
    declare category: string
    declare date: string
    declare isExpense: boolean
    declare userId: string
}

User.init({
    id: {
        primaryKey: true,
        type: new DataTypes.UUID,
        defaultValue: new DataTypes.UUIDV4
    },
    token: {
        type: new DataTypes.UUID,
        defaultValue: new DataTypes.UUIDV4
    },
    name: {
        type: new DataTypes.STRING(128)
    },
    email: {
        type: new DataTypes.STRING(128),
        unique: true
    },
    password: {
        type: new DataTypes.STRING(128)
    }
}, {
    tableName: "users",
    sequelize,
})

Transaction.init({
    id: {
        primaryKey: true,
        type: new DataTypes.UUID,
        defaultValue: new DataTypes.UUIDV4
    },
    amount: {
        type: new DataTypes.DOUBLE
    },
    category: {
        type: new DataTypes.STRING(128)
    },
    date: {
        type: new DataTypes.STRING(128)
    },
    isExpense: {
        type: new DataTypes.BOOLEAN,
        defaultValue: true
    },
    userId: {
        type: new DataTypes.UUID,
    }
}, {
    tableName: "transactions",
    sequelize,
})

User.hasMany(Transaction, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'transactions' // this determines the name in `associations`!
});

(async () => {
    await sequelize.sync()
})()

export default { User, Transaction, sequelize }