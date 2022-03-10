import Transaction from '../../interface/transaction'
import db from '../../db/database'
import TransactionsServices from '../../services/transactions'
import axios from 'axios'
import transactionsData from '../mock/transaction'


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

    it('create transaction', async () => {
        const transaction: Transaction = {
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