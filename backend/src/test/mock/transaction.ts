import { v4 as uuidv4 } from 'uuid'
import Transaction from "../../interface/model/transaction"

const transactions: Transaction[] = [
    {
        id: uuidv4(),
        userId: "1de03d79-d0b4-4ff6-a654-d75ff59beaae",
        amount: 1.99,
        category: 'Food',
        date: '2022-03-04',
        isExpense: true
    },
    {
        id: uuidv4(),
        userId: "1de03d79-d0b4-4ff6-a654-d75ff59beaae",
        amount: 27,
        category: 'Furniture',
        date: '2022-02-06',
        isExpense: false
    },
    {
        id: uuidv4(),
        userId: "1de03d79-d0b4-4ff6-a654-d75ff59beaae",
        amount: 6.99,
        category: 'Alcool',
        date: '2022-02-06',
        isExpense: false
    },
    {
        id: uuidv4(),
        userId: "1de03d79-d0b4-4ff6-a654-d75ff59beaae",
        amount: 24.66,
        category: 'Alcool',
        date: '2022-02-06',
        isExpense: true
    },
    {
        id: uuidv4(),
        userId: "1de03d79-d0b4-4ff6-a654-d75ff59beaae",
        amount: 22.62,
        category: 'Alcool',
        date: '2022-02-06',
        isExpense: true
    }
]

export default transactions
