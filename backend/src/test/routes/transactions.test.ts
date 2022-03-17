import Transaction from '../../interface/model/transaction'
import db from '../../db/database'
import TransactionsServices from '../../services/transactions'
import axios from 'axios'
import transactionsData from '../mock/transaction'
import User from '../../interface/model/user'
import UserService from '../../services/user'

let userToken:string = ""

beforeAll(async () => {
    const user: User = {
        name: "test",
        email: "test@test.com",
        password: "test123",
    }

    const usersService: UserService = new UserService()
    userToken = (await usersService.create(user)).token
    await db.sequelize.sync({ force: true })
})

describe("Testing the transaction routes", () => {

    it('get all transactions', async () => {
        let transactions: Transaction[]

        try {
            await db.Transaction.create({
                ...transactionsData[0],
                token: userToken
            })
            await db.Transaction.create({
                ...transactionsData[1],
                token: userToken
            })
            transactions = await db.Transaction.findAll()

        } catch(error) {
            console.log(error)
            fail()
        }

        const response = await axios.get('http://localhost:8081/api/transactions/'+userToken)
        const transactionsFound: Transaction[] = JSON.parse(JSON.stringify(response.data)) as Transaction[]

        expect(transactionsFound).not.toBeUndefined()
        expect(transactionsFound).not.toBeNull()
        expect(transactionsFound.length).not.toBe(0)

        for(let i = 0; i < transactions.length; i++) {
            expect(transactionsFound[i].id).toEqual(transactions[i].id)
            expect(transactionsFound[i].amount).toEqual(transactions[i].amount)
            expect(transactionsFound[i].date).toEqual(transactions[i].date)
            expect(transactionsFound[i].category).toEqual(transactions[i].category)
            expect(transactionsFound[i].isExpense).toEqual(transactions[i].isExpense)
        }
    })

    it('get all transactions wrong token', async () => {
        const response = await axios.get('http://localhost:8081/api/transactions/5694e504-a811-4370-b9e7-43ad2bce3a39')
        const transactionsFound: Transaction[] = JSON.parse(JSON.stringify(response.data)) as Transaction[]

        expect(transactionsFound).not.toBeUndefined()
        expect(transactionsFound).not.toBeNull()
        expect(transactionsFound.length).toBe(0)
    })

    it('test the expenses route', async () => {
        try {
            await db.Transaction.create({
                ...transactionsData[2],
                token: userToken
            })
            await db.Transaction.create({
                ...transactionsData[3],
                token: userToken
            })
            await db.Transaction.create({
                ...transactionsData[4],
                token: userToken
            })
            await db.Transaction.findAll()

        } catch(error) {
            console.log(error)
            fail()
        }

        const numberOfExpenses = 3
        const response = await axios.get('http://localhost:8081/api/transactions/expenses/'+userToken)
        const transactionsFound: Transaction[] = JSON.parse(JSON.stringify(response.data)) as Transaction[]

        expect(transactionsFound).not.toBeUndefined()
        expect(transactionsFound).not.toBeNull()
        expect(transactionsFound.length).toBe(numberOfExpenses)

        for(let i = 0; i < numberOfExpenses; i++) {
            expect(transactionsFound[i].isExpense).toEqual(true)
        }
    })

    it('test the incomes route', async () => {
        const numberOfExpenses = 2
        const response = await axios.get('http://localhost:8081/api/transactions/incomes/'+userToken)
        const transactionsFound: Transaction[] = JSON.parse(JSON.stringify(response.data)) as Transaction[]

        expect(transactionsFound).not.toBeUndefined()
        expect(transactionsFound).not.toBeNull()
        expect(transactionsFound.length).toBe(numberOfExpenses)

        for(let i = 0; i < numberOfExpenses; i++) {
            expect(transactionsFound[i].isExpense).toEqual(false)
        }
    })

    it('get transaction', async () => {
        const response = await axios.get('http://localhost:8081/api/transactions/'+userToken+"/"+transactionsData[3].id)
        const transactionFound: Transaction = JSON.parse(JSON.stringify(response.data)) as Transaction


        expect(transactionFound).not.toBeUndefined()
        expect(transactionFound).not.toBeNull()

        expect(transactionFound.id).toEqual(transactionsData[3].id)
        expect(transactionFound.amount).toEqual(transactionsData[3].amount)
        expect(transactionFound.date).toEqual(transactionsData[3].date)
        expect(transactionFound.category).toEqual(transactionsData[3].category)
        expect(transactionFound.isExpense).toEqual(transactionsData[3].isExpense)
    })

    it('create transaction', async () => {
        const transaction: Transaction = {
            token: userToken,
            amount: 1.99,
            category: "cat 1",
            date: "2022",
            isExpense: true,
        }

        const response = await axios.post('http://localhost:8081/api/transactions', transaction)
        const transactionCreated: Transaction = JSON.parse(JSON.stringify(response.data)) as Transaction

        expect(transactionCreated).not.toBeUndefined()
        expect(transactionCreated).not.toBeNull()
        expect(transactionCreated.id).not.toBeUndefined()

        expect(transactionCreated.token).toEqual(userToken)
        expect(transactionCreated.amount).toEqual(transaction.amount)
        expect(transactionCreated.date).toEqual(transaction.date)
        expect(transactionCreated.category).toEqual(transaction.category)
        expect(transactionCreated.isExpense).toEqual(transaction.isExpense)
    })

})

afterAll(async () => {
    await db.sequelize.close()
});