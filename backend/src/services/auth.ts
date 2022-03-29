import db from '../db/database'

import User from "../interface/model/user"

class AuthService {

    public async getToken(email: string, password: string): Promise<string> {
        const user: User = await db.User.findOne({
            where: {
                email,
                password
            }
        })

        if(user === null) return ""
        return user.token
    }

    public async getUserId(token: string): Promise<string> {
        const user: User = await db.User.findOne({
            where: {
                token
            }
        })

        if(user === null) return ""
        return user.id
    }

}

export default AuthService