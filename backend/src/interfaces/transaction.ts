export default interface Transaction {
    id?: string
    amount: number
    category: string
    date: string
    isExpense: boolean
}