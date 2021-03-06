import Transaction from '../../interface/model/transaction'
import db from '../../db/database'
import TransactionsServices from '../../services/transactions'
import transactionsData from '../mock/transaction'
import User from '../../interface/model/user'
import UserService from '../../services/user'

let userId:string = ""

beforeAll(async () => {
    await db.sequelize.sync({ force: true })
    const user: User = {
        name: "test",
        email: "test@test.com",
        password: "test123",
    }

    const usersService: UserService = new UserService()
    userId = (await usersService.create(user)).id
})

describe("Testing the transaction service", () => {

    it('get all transactions', async () => {
        let transactions: Transaction[]

        const usersService: UserService = new UserService()
        const user = await usersService.get(userId)
        if(!user) fail()

        try {
            await db.Transaction.create({
                ...transactionsData[0],
                userId
            })
            await db.Transaction.create({
                ...transactionsData[1],
                userId
            })
            transactions = await db.Transaction.findAll()

        } catch(error) {
            console.log(error)
            fail()
        }

        const transactionsServices: TransactionsServices = new TransactionsServices()
        const transactionsFound = await transactionsServices.getAll(userId)

        expect(transactionsFound).not.toBeUndefined()
        expect(transactionsFound).not.toBeNull()
        expect(transactionsFound.length).not.toBe(0)

        for(let i = 0; i < transactions.length; i++) {
            expect(transactionsFound[i].id).toEqual(transactions[i].id)
            expect(transactionsFound[i].userId).toEqual(transactions[i].userId)
            expect(transactionsFound[i].amount).toEqual(transactions[i].amount)
            expect(transactionsFound[i].date).toEqual(transactions[i].date)
            expect(transactionsFound[i].category).toEqual(transactions[i].category)
            expect(transactionsFound[i].isExpense).toEqual(transactions[i].isExpense)
        }
    })

    it('get all expenses', async () => {

        const usersService: UserService = new UserService()
        const user = await usersService.get(userId)
        if(!user) fail()

        try {
            await db.Transaction.create({
                ...transactionsData[2],
                userId
            })
            await db.Transaction.create({
                ...transactionsData[3],
                userId
            })
            await db.Transaction.create({
                ...transactionsData[4],
                userId
            })
            await db.Transaction.findAll()

        } catch(error) {
            console.log(error)
            fail()
        }

        const numberOfExpenses = 3
        const transactionsServices: TransactionsServices = new TransactionsServices()
        const transactionsFound = await transactionsServices.getAllExpenses(userId)

        expect(transactionsFound).not.toBeUndefined()
        expect(transactionsFound).not.toBeNull()
        expect(transactionsFound.length).toBe(numberOfExpenses)

        for(let i = 0; i < numberOfExpenses; i++) {
            expect(transactionsFound[i].isExpense).toEqual(true)
        }
    })

    it('get all incomes', async () => {
        const numberOfExpenses = 2
        const transactionsServices: TransactionsServices = new TransactionsServices()
        const transactionsFound = await transactionsServices.getAllIncomes(userId)

        expect(transactionsFound).not.toBeUndefined()
        expect(transactionsFound).not.toBeNull()
        expect(transactionsFound.length).toBe(numberOfExpenses)

        for(let i = 0; i < numberOfExpenses; i++) {
            expect(transactionsFound[i].isExpense).toEqual(false)
        }
    })

    it('get transaction', async () => {

        const transactionsServices: TransactionsServices = new TransactionsServices()
        const transactionFound = await transactionsServices.get(userId, transactionsData[2].id)

        expect(transactionFound).not.toBeUndefined()
        expect(transactionFound).not.toBeNull()

        expect(transactionFound.id).toEqual(transactionsData[2].id)
        expect(transactionFound.userId).toEqual(userId)
        expect(transactionFound.amount).toEqual(transactionsData[2].amount)
        expect(transactionFound.date).toEqual(transactionsData[2].date)
        expect(transactionFound.category).toEqual(transactionsData[2].category)
        expect(transactionFound.isExpense).toEqual(transactionsData[2].isExpense)
    })

    it('create transaction', async () => {
        const transaction: Transaction = {
            userId,
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
        const transactionDeleted = await transactionsServices.delete(userId, transactionsData[0].id)

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