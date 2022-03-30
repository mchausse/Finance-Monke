import db from '../db/database'

import Transaction from "../interface/model/transaction"

class TransactionsService {

    public async getAll(userId: string): Promise<Transaction[]> {
        const transactionList: Transaction[] = await db.Transaction.findAll({
            where: {
                userId
            }
        })

        return transactionList
    }

    public async getAllExpenses(userId: string): Promise<Transaction[]> {
        const transactionList: Transaction[] = await db.Transaction.findAll({
            where: {
                userId,
                isExpense: true
            }
        })

        return transactionList
    }

    public async getAllIncomes(userId: string): Promise<Transaction[]> {
        const transactionList: Transaction[] = await db.Transaction.findAll({
            where: {
                userId,
                isExpense: false
            }
        })

        return transactionList
    }

    public async get(userId: string, id: string): Promise<Transaction> {
        const transaction: Transaction = await db.Transaction.findOne({
            where: {
                userId,
                id
            }
        })

        return transaction
    }

    public async create(transaction: any): Promise<Transaction> {
        const transactionCreated = await db.Transaction.create(transaction)

        return transactionCreated
    }

    public async delete(userId: string, id: string): Promise<number> {
        const transactionDeleted = await db.Transaction.destroy({
            where: {
                userId,
                id
            }
        })

        return transactionDeleted
    }

}

export default TransactionsService