import express from "express"
import AuthService from "../services/auth"
import Transaction from "../interface/model/transaction"
import TransactionsServices from "../services/transactions"

const router = express.Router();

router.get('/:token', async (req, res) => {
    const token: string = req.params.token
    let transactions: Transaction[] = []
    let userId: string

    if(token) {
        const loginService: AuthService = new AuthService()
        userId = await loginService.getUserId(token)
    }

    if(userId) {
        const transactionsServices: TransactionsServices = new TransactionsServices()
        transactions = await transactionsServices.getAll(userId)
    }

    res.send(transactions)
})

router.get('/expenses/:token', async (req, res) => {
    const token: string = req.params.token
    let transactions: Transaction[] = []
    let userId: string


    if(token) {
        const loginService: AuthService = new AuthService()
        userId = await loginService.getUserId(token)
    }

    if(userId) {
        const transactionsServices: TransactionsServices = new TransactionsServices()
        transactions = await transactionsServices.getAllExpenses(userId)
    }

    res.send(transactions)
})

router.get('/incomes/:token', async (req, res) => {
    const token: string = req.params.token
    let transactions: Transaction[] = []
    let userId: string

    if(token) {
        const loginService: AuthService = new AuthService()
        userId = await loginService.getUserId(token)
    }

    if(userId) {
        const transactionsServices: TransactionsServices = new TransactionsServices()
        transactions = await transactionsServices.getAllIncomes(userId)
    }

    res.send(transactions)
})

router.get('/:token/:id', async (req, res) => {
    const token: string = req.params.token
    const id: string = req.params.id
    let transactions: Transaction
    let userId: string

    if(token) {
        const loginService: AuthService = new AuthService()
        userId = await loginService.getUserId(token)
    }

    if(userId) {
        const transactionsServices: TransactionsServices = new TransactionsServices()
        transactions = await transactionsServices.get(userId, id)
    }

    res.send(transactions)
})

router.post('/', async (req, res) => {
    let transaction: Transaction
    const transactionData = req.body
    let userId: string

    const token: string = req.body.token
    if(token) {
        const loginService: AuthService = new AuthService()
        userId = await loginService.getUserId(token)
    }

    if(userId) {
        const transactionsServices: TransactionsServices = new TransactionsServices()
        transaction = await transactionsServices.create({
            userId,
            amount: transactionData.amount,
            category: transactionData.category,
            date: transactionData.date,
            isExpense: transactionData.isExpense
        })
    }

    res.send(transaction)
})

router.delete('/:token/:id', async (req, res) => {

    const token: string = req.params.token
    const id: string = req.params.id
    let transactionsNumber: number
    let userId: string


    if(token) {
        const loginService: AuthService = new AuthService()
        userId = await loginService.getUserId(token)
    }

    if(userId) {
        const transactionsServices: TransactionsServices = new TransactionsServices()
        transactionsNumber = await transactionsServices.delete(userId, id)
    }

    res.send({
        "Number of transactions deleted": transactionsNumber
    })
})

export default router