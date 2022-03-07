import express from "express"
import ExpensesServices from "../../services/expensesServices"

const router = express.Router();

router.get('/', async (req, res) => {
    const expensesServices: ExpensesServices = new ExpensesServices()
    const expenses = await expensesServices.getAll()

    res.send(expenses)
})

router.get('/:id', async (req, res) => {

    const expensesServices: ExpensesServices = new ExpensesServices()
    const expenses = await expensesServices.get(req.params.id as unknown as number)

    res.send(expenses)
})

router.post('/', async (req, res) => {
    const expensesServices: ExpensesServices = new ExpensesServices()
    const expenses = await expensesServices.create(req.body)

    res.send(expenses)
})

export default router