import { ObjectId } from "mongodb"

export default class Transaction {
    public id?: ObjectId
    public userId: string
    public amount: number
    public category: string
    public date: string
    public isExpense: boolean
}