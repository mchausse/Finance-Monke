import { v4 as uuidv4 } from 'uuid'
import Transaction from "../../interface/model/transaction"

const transactions: Transaction[] = [
    {
        id: uuidv4(),
        userId: "5dbc7a9f-1235-4901-bc16-f8c0482962e9",
        amount: 1.99,
        category: 'Food',
        date: '2022-03-04',
        isExpense: true
    },
    {
        id: uuidv4(),
        userId: "5dbc7a9f-1235-4901-bc16-f8c0482962e9",
        amount: 27,
        category: 'Furniture',
        date: '2022-02-06',
        isExpense: false
    },
    {
        id: uuidv4(),
        userId: "5dbc7a9f-1235-4901-bc16-f8c0482962e9",
        amount: 6.99,
        category: 'Alcool',
        date: '2022-02-06',
        isExpense: false
    },
    {
        id: uuidv4(),
        userId: "5dbc7a9f-1235-4901-bc16-f8c0482962e9",
        amount: 24.66,
        category: 'Alcool',
        date: '2022-02-06',
        isExpense: true
    },
    {
        id: uuidv4(),
        userId: "5dbc7a9f-1235-4901-bc16-f8c0482962e9",
        amount: 22.62,
        category: 'Alcool',
        date: '2022-02-06',
        isExpense: true
    }
]

export default transactions
