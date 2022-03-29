export default interface Transaction {
    id?: string
    userId: string
    amount: number
    category: string
    date: string
    isExpense: boolean
}