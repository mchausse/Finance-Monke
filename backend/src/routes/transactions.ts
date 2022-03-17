import express from "express"
import Transaction from "../interface/model/transaction";
import TransactionsServices from "../services/transactions"

const router = express.Router();

router.get('/:token', async (req, res) => {
    const token: string = req.params.token
    let transactions: Transaction[] = []

    if(token) {
        const transactionsServices: TransactionsServices = new TransactionsServices()
        transactions = await transactionsServices.getAll(token)
    }

    res.send(transactions)
})

router.get('/expenses/:token', async (req, res) => {
    const token: string = req.params.token
    let transactions: Transaction[] = []

    if(token) {
        const transactionsServices: TransactionsServices = new TransactionsServices()
        transactions = await transactionsServices.getAllExpenses(token)
    }

    res.send(transactions)
})

router.get('/incomes/:token', async (req, res) => {
    const token: string = req.params.token
    let transactions: Transaction[] = []

    if(token) {
        const transactionsServices: TransactionsServices = new TransactionsServices()
        transactions = await transactionsServices.getAllIncomes(token)
    }

    res.send(transactions)
})

router.get('/:token/:id', async (req, res) => {
    const token: string = req.params.token
    const id: string = req.params.id
    let transactions: Transaction

    if(token) {
        const transactionsServices: TransactionsServices = new TransactionsServices()
        transactions = await transactionsServices.get(token, id)
    }

    res.send(transactions)
})

router.post('/', async (req, res) => {
    const transactionsServices: TransactionsServices = new TransactionsServices()
    const transactions = await transactionsServices.create(req.body)

    res.send(transactions)
})

router.delete('/:token/:id', async (req, res) => {

    const token: string = req.params.token
    const id: string = req.params.id
    let transactionsNumber: number

    if(token) {
        const transactionsServices: TransactionsServices = new TransactionsServices()
        transactionsNumber = await transactionsServices.delete(token, id)
    }

    res.send({
        "Number of transactions deleted": transactionsNumber
    })
})

export default router