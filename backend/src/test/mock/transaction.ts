import { ObjectId } from "mongodb"
import Transaction from "../../interface/model/transaction"

const transactions: Transaction[] = [
    {
        id: new ObjectId(),
        userId: "1de03d79-d0b4-4ff6-a654-d75ff59beaae",
        amount: 1.99,
        category: 'Food',
        date: '2022-03-04',
        isExpense: true
    },
    {
        id: new ObjectId(),
        userId: "1de03d79-d0b4-4ff6-a654-d75ff59beaae",
        amount: 27,
        category: 'Furniture',
        date: '2022-02-06',
        isExpense: false
    },
    {
        id: new ObjectId(),
        userId: "1de03d79-d0b4-4ff6-a654-d75ff59beaae",
        amount: 6.99,
        category: 'Alcool',
        date: '2022-02-06',
        isExpense: false
    },
    {
        id: new ObjectId(),
        userId: "1de03d79-d0b4-4ff6-a654-d75ff59beaae",
        amount: 24.66,
        category: 'Alcool',
        date: '2022-02-06',
        isExpense: true
    },
    {
        id: new ObjectId(),
        userId: "1de03d79-d0b4-4ff6-a654-d75ff59beaae",
        amount: 22.62,
        category: 'Alcool',
        date: '2022-02-06',
        isExpense: true
    }
]

export default transactions
