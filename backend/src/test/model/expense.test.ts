import Expense from '../../model/expense'
import db from '../../db/database'
import { v4 as uuidv4 } from 'uuid'

const expenseData: Expense[] = [
    {
        id: uuidv4(),
        amount: 1.99,
        category: 'Food',
        date: '2022-03-04'
    },
    {
        id: uuidv4(),
        amount: 27,
        category: 'Furniture',
        date: '2022-02-06'
    },
    {
        id: uuidv4(),
        amount: 6.99,
        category: 'Alcool',
        date: '2022-02-06'
    }
]

beforeAll(async () => {
    await db.sequelize.sync({ force: true })
})

describe("Testing the db", () => {

    it('create expense', async () => {
        try {
            const expenseCreated = await db.Expense.create(expenseData[0])

            expect(expenseCreated).not.toBeUndefined()
            expect(expenseCreated).not.toBeNull()

            expect(expenseCreated.id).toEqual(expenseData[0].id)
            expect(expenseCreated.amount).toEqual(expenseData[0].amount)
            expect(expenseCreated.category).toEqual(expenseData[0].category)
            expect(expenseCreated.date).toEqual(expenseData[0].date)
        } catch(error) {
            console.log(error)
            fail()
        }
    })

    it('get expense', async () => {
        try {
            const expenseFound = await db.Expense.findOne({ where: { id: expenseData[0].id}})

            expect(expenseFound).not.toBeUndefined()
            expect(expenseFound).not.toBeNull()
            expect(expenseFound.id).toEqual(expenseData[0].id)
            expect(expenseFound.amount).toEqual(expenseData[0].amount)
            expect(expenseFound.category).toEqual(expenseData[0].category)
            expect(expenseFound.date).toEqual(expenseData[0].date)
        } catch(error) {
            console.log(error)
            fail()
        }
    })

    it('get all expenses', async () => {
        try {
            await db.Expense.create(expenseData[1])
            const expenseFound: Expense[] = await db.Expense.findAll()

            expect(expenseFound).not.toBeUndefined()
            expect(expenseFound.length).toEqual(2)

            expect(expenseFound[0].id).toEqual(expenseData[0].id)
            expect(expenseFound[0].amount).toEqual(expenseData[0].amount)
            expect(expenseFound[0].category).toEqual(expenseData[0].category)
            expect(expenseFound[0].date).toEqual(expenseData[0].date)

            expect(expenseFound[1].id).toEqual(expenseData[1].id)
            expect(expenseFound[1].amount).toEqual(expenseData[1].amount)
            expect(expenseFound[1].category).toEqual(expenseData[1].category)
            expect(expenseFound[1].date).toEqual(expenseData[1].date)
        } catch(error) {
            console.log(error)
            fail()
        }
    })

    it('remove expense', async () => {
        try {
            const expenseDeleted = await db.Expense.destroy({ where: { id: expenseData[0].id}})

            expect(expenseDeleted).not.toBeUndefined()
            expect(expenseDeleted).not.toBeNull()

            expect(expenseDeleted).toEqual(1)
        } catch(error) {
            console.log(error)
            fail()
        }
    })
})

afterAll(async () => {
    await db.sequelize.close()
});