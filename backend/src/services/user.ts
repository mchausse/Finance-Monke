import db from '../db/database'

import User from "../interface/model/user"

class UserService {

    public async getAll(): Promise<User[]> {
        const userList: User[] = await db.User.findAll()

        return userList
    }

    public async get(id: string): Promise<User> {
        const user: User = await db.User.findOne({
            where: {
                id
            }
        })

        return user
    }

    public async create(transaction: User): Promise<User> {
        const userCreated = await db.User.create(transaction)

        return userCreated
    }

    public async delete(id: string): Promise<number> {
        const userDeleted = await db.User.destroy({
            where: {
                id
            }
        })

        return userDeleted
    }

}

export default UserService