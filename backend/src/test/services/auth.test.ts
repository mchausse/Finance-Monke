import User from '../../interface/model/user'
import db from '../../db/database'
import UserService from '../../services/user'
import AuthService from '../../services/auth'

let user: User

beforeAll(async () => {
    await db.sequelize.sync({ force: true })
    const userModel: User = {
        name: "test",
        email: "test@test.com",
        password: "test123",
    }

    const usersService: UserService = new UserService()
    user = await usersService.create(userModel)
})

describe("Testing the auth service", () => {

    it('get token', async () => {
        const authService: AuthService = new AuthService()
        const token: string = await authService.getToken(user.email, user.password)

        expect(token).toBe(user.token)
    })

    it('get token no email', async () => {
        const authService: AuthService = new AuthService()
        const token: string = await authService.getToken("", "test")

        expect(token).toBe("")
    })

    it('get userId', async () => {
        const authService: AuthService = new AuthService()
        const userId: string = await authService.getUserId(user.token)

        expect(userId).toBe(user.id)
    })

    it('get userId bad token', async () => {
        try {
            const authService: AuthService = new AuthService()
            const userId: string = await authService.getUserId("ba299f33-bd1c-4344-be0f-19c3db4bbe98")

            console.log("userId: ", userId)
            expect(userId).toBe("")
        } catch(e) {
            console.log(e)
            fail()
        }
    })

})

afterAll(async () => {
    await db.sequelize.close()
});