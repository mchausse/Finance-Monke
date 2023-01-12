import { ObjectId } from "mongodb"

export default class User {
    public id?: ObjectId
    public token?: string
    public name: string
    public email: string
    public password: string

}