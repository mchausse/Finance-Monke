import db from '../db/database'

import User from "../interface/user"

class LoginService {

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

}

export default LoginService