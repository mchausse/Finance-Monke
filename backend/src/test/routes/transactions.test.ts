import Transaction from '../../interfaces/transaction'
import db from '../../db/database'
import { v4 as uuidv4 } from 'uuid'
import TransactionsServices from '../../services/TransactionsService'
import axios from 'axios'

const transactionsData: Transaction[] = [
    {
        id: uuidv4(),
        amount: 1.99,
        category: 'Food',
        date: '2022-03-04',
        isExpense: true
    },
    {
        id: uuidv4(),
        amount: 27,
        category: 'Furniture',
        date: '2022-02-06',
        isExpense: false
    },
    {
        id: uuidv4(),
        amount: 6.99,
        category: 'Alcool',
        date: '2022-02-06',
        isExpense: false
    },
    {
        id: uuidv4(),
        amount: 24.66,
        category: 'Alcool',
        date: '2022-02-06',
        isExpense: true
    }
]

beforeAll(async () => {
    await db.sequelize.sync({ force: true })
})

describe("Testing the transaction routes", () => {

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

        const response = await axios.get('http://localhost:8081/api/transactions')
        const transactionsFound: Transaction[] = JSON.parse(JSON.stringify(response.data)) as Transaction[]

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

        const response = await axios.get('http://localhost:8081/api/transactions')
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

})

afterAll(async () => {
    await db.sequelize.close()
});