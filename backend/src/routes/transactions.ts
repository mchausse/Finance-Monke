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

router.get('/:id', async (req, res) => {

    const transactionsServices: TransactionsServices = new TransactionsServices()
    const transactions = await transactionsServices.get(req.params.id)

    res.send(transactions)
})

router.post('/', async (req, res) => {
    const transactionsServices: TransactionsServices = new TransactionsServices()
    const transactions = await transactionsServices.create(req.body)

    res.send(transactions)
})

router.delete('/:id', async (req, res) => {

    const transactionsServices: TransactionsServices = new TransactionsServices()
    const transactions = await transactionsServices.delete(req.params.id)

    res.send({
        "Number of transactions deleted": transactions
    })
})

export default router