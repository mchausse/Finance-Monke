import User from '../../interface/model/user'
import db from '../../db/database'
import UserService from '../../services/user'
import AuthService from '../../services/auth'


beforeAll(async () => {
    await db.sequelize.sync({ force: true })
})

describe("Testing the auth service", () => {

    it('get token', async () => {
        const user: User = {
            name: "test",
            email: "test@test.com",
            password: "test123",
        }

        const usersService: UserService = new UserService()
        const userCreated = await usersService.create(user)

        const authService: AuthService = new AuthService()
        const token: string = await authService.getToken(user.email, user.password)

        expect(token).toBe(userCreated.token)
    })

    it('get token no email', async () => {
        const authService: AuthService = new AuthService()
        const token: string = await authService.getToken("", "test")

        expect(token).toBe("")
    })
})