import { ObjectId } from 'mongodb'
import { collections } from '../db/database'

import User from "../interface/model/user"

class UserService {

    public async getAll(): Promise<User[]> {
        const userList: User[] = await collections.users.find<User>({}).toArray() as User[]

        return userList
    }

    public async get(id: ObjectId): Promise<User> {
        const filter = {
            _id: id
        }
        const user: User = await collections.users.findOne<User>(filter) as User

        return user
    }

    public async create(user: User): Promise<User> {
        await collections.users.insertOne(user)
        const userCreated = this.get(user.id)
        return userCreated
    }

    public async delete(id: string) {
        const filter = {
            _id: id
        }
        await collections.users.deleteOne(filter)
    }

}

export default UserService