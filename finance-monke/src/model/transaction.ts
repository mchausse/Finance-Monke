export default interface Transaction {
    id?: string
    token: string
    amount: number
    category: string
    date: string
    isExpense: boolean
}