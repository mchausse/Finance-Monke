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

        console.log("transaction 1: ", {
            ...transactionsData[0],
            token: userToken
        })

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

        console.log("transactions received : ", transactionsFound)

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

    it('get transaction', async () => {

        const response = await axios.get('http://localhost:8081/api/transactions/'+userToken)
        const transactionsFound: Transaction[] = JSON.parse(JSON.stringify(response.data)) as Transaction[]

        if(transactionsFound.length < 1) fail()

        const transaction: Transaction = transactionsFound[0]
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
            token: userToken,
            amount: 1.99,
            category: "cat 1",
            date: "2022",
            isExpense: true,
        }

        const response = await axios.post('http://localhost:8081/api/transactions', transaction)
        console.log("data: ", response.data)
        const transactionCreated: Transaction = JSON.parse(JSON.stringify(response.data)) as Transaction

        expect(transactionCreated).not.toBeUndefined()
        expect(transactionCreated).not.toBeNull()
        expect(transactionCreated.id).not.toBeUndefined()

        expect(transactionCreated.amount).toEqual(transaction.amount)
        expect(transactionCreated.date).toEqual(transaction.date)
        expect(transactionCreated.category).toEqual(transaction.category)
        expect(transactionCreated.isExpense).toEqual(transaction.isExpense)
    })

})

afterAll(async () => {
    await db.sequelize.close()
});