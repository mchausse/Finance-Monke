import Transaction from '../../interface/model/transaction'
import db from '../../db/database'
import transactionsData from '../mock/transaction'

beforeAll(async () => {
    await db.sequelize.sync({ force: true })
})

describe("Testing the transaction models", () => {

    it('create transaction', async () => {
        try {
            const transactionCreated = await db.Transaction.create(transactionsData[0])

            expect(transactionCreated).not.toBeUndefined()
            expect(transactionCreated).not.toBeNull()

            expect(transactionCreated.id).toEqual(transactionsData[0].id)
            expect(transactionCreated.amount).toEqual(transactionsData[0].amount)
            expect(transactionCreated.category).toEqual(transactionsData[0].category)
            expect(transactionCreated.date).toEqual(transactionsData[0].date)
            expect(transactionCreated.isExpense).toEqual(transactionsData[0].isExpense)
        } catch(error) {
            console.log(error)
            fail()
        }
    })

    it('get transaction', async () => {
        try {
            const transactionFound = await db.Transaction.findOne({ where: { id: transactionsData[0].id}})

            expect(transactionFound).not.toBeUndefined()
            expect(transactionFound).not.toBeNull()
            expect(transactionFound.id).toEqual(transactionsData[0].id)
            expect(transactionFound.amount).toEqual(transactionsData[0].amount)
            expect(transactionFound.category).toEqual(transactionsData[0].category)
            expect(transactionFound.date).toEqual(transactionsData[0].date)
            expect(transactionFound.isExpense).toEqual(transactionsData[0].isExpense)
        } catch(error) {
            console.log(error)
            fail()
        }
    })

    it('get all transactions', async () => {
        try {
            await db.Transaction.create(transactionsData[1])
            const transactionFound: Transaction[] = await db.Transaction.findAll()

            expect(transactionFound).not.toBeUndefined()
            expect(transactionFound.length).toEqual(2)

            expect(transactionFound[0].id).toEqual(transactionsData[0].id)
            expect(transactionFound[0].amount).toEqual(transactionsData[0].amount)
            expect(transactionFound[0].category).toEqual(transactionsData[0].category)
            expect(transactionFound[0].date).toEqual(transactionsData[0].date)

            expect(transactionFound[1].id).toEqual(transactionsData[1].id)
            expect(transactionFound[1].amount).toEqual(transactionsData[1].amount)
            expect(transactionFound[1].category).toEqual(transactionsData[1].category)
            expect(transactionFound[1].date).toEqual(transactionsData[1].date)
            expect(transactionFound[1].isExpense).toEqual(transactionsData[1].isExpense)
        } catch(error) {
            console.log(error)
            fail()
        }
    })

    it('remove transaction', async () => {
        try {
            const transactionDeleted = await db.Transaction.destroy({ where: { id: transactionsData[0].id}})

            expect(transactionDeleted).not.toBeUndefined()
            expect(transactionDeleted).not.toBeNull()

            expect(transactionDeleted).toEqual(1)
        } catch(error) {
            console.log(error)
            fail()
        }
    })
})

afterAll(async () => {
    await db.sequelize.close()
});