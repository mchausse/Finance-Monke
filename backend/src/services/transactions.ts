import { ObjectId } from 'mongodb'
import { collections } from '../db/database'
import Transaction from "../interface/model/transaction"

class TransactionsService {

    public async getAll(userId: string): Promise<Transaction[]> {
        const filter = {
            userId: userId
        }
        const transactions: Transaction[] = await collections.transactions.find<Transaction>(filter).toArray()

        return transactions
    }

    public async getAllExpenses(userId: string): Promise<Transaction[]> {
        const filter = {
            userId: userId,
            isExpense: true
        }
        const transactions: Transaction[] = await collections.transactions.find<Transaction>(filter).toArray()

        return transactions
    }

    public async getAllIncomes(userId: string): Promise<Transaction[]> {
        const filter = {
            userId: userId,
            isExpense: false
        }
        const transactions: Transaction[] = await collections.transactions.find<Transaction>(filter).toArray()

        return transactions
    }

    public async get(userId: string, id: string): Promise<Transaction> {
        const filter = {
            _id: id,
            userId: userId
        }
        const transaction: Transaction = await collections.transactions.findOne(filter)

        return transaction
    }

    public async insertOne(transactions: any): Promise<Transaction> {
        const transactionsCreated = await collections.transactions.insertOne(transactions)

        return transactionsCreated
    }

    public async delete(userId: string, id: string): Promise<number> {
        const transactionsDeleted = await collections.transactions.deleteOne({
            where: {
                userId,
                id
            }
        })

        return transactionsDeleted
    }

}

export default TransactionsService