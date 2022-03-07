import express from "express"
import ExpensesServices from "../../services/expensesServices";

const router = express.Router();

router.get('/', (req, res) => {
    const expensesServices: ExpensesServices = new ExpensesServices()
    const expenses = expensesServices.getAll()
    res.send('Hello')
})

export default router;