import db from '../db/database'

import { Expense }from "../model/expense.model"

class ExpensesServices {

    public async getAll(): Promise<Expense[]> {
        const expenseList: Expense[] = await db.Expense.findAll()

        return expenseList
    }

    public async get(id: number): Promise<Expense> {
        const expense: Expense = await db.Expense.findOne({
            where: {
                id
            }
        })

        return expense
    }

    public async create(expense: Expense): Promise<Expense> {
        const expenseCreated = await db.Expense.create(expense)

        return expenseCreated
    }

}

export default ExpensesServices