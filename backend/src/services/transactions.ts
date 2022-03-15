import db from '../db/database'

import Transaction from "../interface/model/transaction"

class TransactionsService {

    public async getAll(token: string): Promise<Transaction[]> {
        const transactionList: Transaction[] = await db.Transaction.findAll({
            where: {
                token
            }
        })

        return transactionList
    }

    public async get(token: string, id: string): Promise<Transaction> {
        const transaction: Transaction = await db.Transaction.findOne({
            where: {
                token,
                id
            }
        })

        return transaction
    }

    public async create(transaction: Transaction): Promise<Transaction> {
        const transactionCreated = await db.Transaction.create(transaction)

        return transactionCreated
    }

    public async delete(token: string, id: string): Promise<number> {
        const transactionDeleted = await db.Transaction.destroy({
            where: {
                token,
                id
            }
        })

        return transactionDeleted
    }

}

export default TransactionsService