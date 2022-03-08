import Expense from '../../model/expense'
import db from '../../db/database'
import { v4 as uuidv4 } from 'uuid'
import ExpensesServices from '../../services/expensesServices'

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
        let expenses: Expense[]

        try {
            await db.Expense.create(expenseData[0])
            await db.Expense.create(expenseData[1])
            expenses = await db.Expense.findAll()

        } catch(error) {
            console.log(error)
            fail()
        }


        const expensesServices: ExpensesServices = new ExpensesServices()
        const expensesFound = await expensesServices.getAll()

        expect(expensesFound).not.toBeUndefined()
        expect(expensesFound).not.toBeNull()

        for(let i = 0; i < expenses.length; i++) {
            expect(expensesFound[i].id).toEqual(expenses[i].id)
            expect(expensesFound[i].amount).toEqual(expenses[i].amount)
            expect(expensesFound[i].date).toEqual(expenses[i].date)
            expect(expensesFound[i].category).toEqual(expenses[i].category)
        }
    })
})

afterAll(async () => {
    await db.sequelize.close()
});