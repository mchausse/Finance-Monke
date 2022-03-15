import Transaction from '../../interface/model/transaction'
import db from '../../db/database'
import TransactionsServices from '../../services/transactions'
import transactionsData from '../mock/transaction'


beforeAll(async () => {
    await db.sequelize.sync({ force: true })
})

describe("Testing the transaction service", () => {

    it('get all transactions', async () => {
        let transactions: Transaction[]

        try {
            await db.Transaction.create(transactionsData[0])
            await db.Transaction.create(transactionsData[1])
            transactions = await db.Transaction.findAll()

        } catch(error) {
            console.log(error)
            fail()
        }


        const transactionsServices: TransactionsServices = new TransactionsServices()
        const transactionsFound = await transactionsServices.getAll()

        expect(transactionsFound).not.toBeUndefined()
        expect(transactionsFound).not.toBeNull()

        for(let i = 0; i < transactions.length; i++) {
            expect(transactionsFound[i].id).toEqual(transactions[i].id)
            expect(transactionsFound[i].amount).toEqual(transactions[i].amount)
            expect(transactionsFound[i].date).toEqual(transactions[i].date)
            expect(transactionsFound[i].category).toEqual(transactions[i].category)
            expect(transactionsFound[i].isExpense).toEqual(transactions[i].isExpense)
        }
    })

    it('get transaction', async () => {
        let transaction: Transaction

        try {
            transaction = await db.Transaction.create(transactionsData[2])

        } catch(error) {
            console.log(error)
            fail()
        }

        const transactionsServices: TransactionsServices = new TransactionsServices()
        const transactionFound = await transactionsServices.get(transaction.id)

        expect(transactionFound).not.toBeUndefined()
        expect(transactionFound).not.toBeNull()

        expect(transactionFound.id).toEqual(transaction.id)
        expect(transactionFound.amount).toEqual(transaction.amount)
        expect(transactionFound.date).toEqual(transaction.date)
        expect(transactionFound.category).toEqual(transaction.category)
        expect(transactionFound.isExpense).toEqual(transaction.isExpense)
    })

    it('create transaction', async () => {
        const transaction: Transaction = {
            amount: 24.66,
            category: 'Alcool',
            date: '2022-02-06',
            isExpense: true
        }

        const transactionsServices: TransactionsServices = new TransactionsServices()
        const transactionCreated = await transactionsServices.create(transaction)

        expect(transactionCreated).not.toBeUndefined()
        expect(transactionCreated).not.toBeNull()
        expect(transactionCreated.id).not.toBeUndefined()

        expect(transactionCreated.amount).toEqual(transaction.amount)
        expect(transactionCreated.date).toEqual(transaction.date)
        expect(transactionCreated.category).toEqual(transaction.category)
        expect(transactionCreated.isExpense).toEqual(transaction.isExpense)
    })

    it('delete transaction', async () => {
        let transactions: Transaction[]
        let nbTransactionsBefore: number
        let nbTransactionsAfter: number

        try {
            transactions = await db.Transaction.findAll()
            nbTransactionsBefore = transactions.length

        } catch(error) {
            console.log(error)
            fail()
        }

        const transactionsServices: TransactionsServices = new TransactionsServices()
        const transactionDeleted = await transactionsServices.delete(transactionsData[0].id)

        expect(transactionDeleted).not.toBeUndefined()
        expect(transactionDeleted).not.toBeNull()

        expect(transactionDeleted).toBe(1)

        try {
            nbTransactionsAfter = (await db.Transaction.findAll()).length

        } catch(error) {
            console.log(error)
            fail()
        }

        expect(nbTransactionsAfter).toBe(nbTransactionsBefore - 1)
    })
})

afterAll(async () => {
    await db.sequelize.close()
});