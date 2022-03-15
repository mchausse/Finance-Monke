import User from '../../interface/model/user'
import db from '../../db/database'
import UserService from '../../services/user'
import axios from 'axios'
import LoginResponse from '../../interface/routes/response/auth'


beforeAll(async () => {
    await db.sequelize.sync({ force: true })
})

describe("Testing the auth route", () => {

    it('login', async () => {
        const user: User = {
            name: "test",
            email: "test@test.com",
            password: "test123",
        }

        const usersService: UserService = new UserService()
        const userCreated = await usersService.create(user)

        const response = await axios.post('http://localhost:8081/api/auth/login', {
            email: user.email,
            password: user.password
        })
        const responseData: LoginResponse = JSON.parse(JSON.stringify(response.data))

        expect(responseData.token).toBe(userCreated.token)
        expect(responseData.error).toBeNull()
    })

    it('get token no email', async () => {
        const user: User = {
            name: "test",
            email: "test@test.com",
            password: "test123",
        }

        const usersService: UserService = new UserService()
        await usersService.create(user)

        const response = await axios.post('http://localhost:8081/api/auth/login', {
            email: "",
            password: user.password
        })
        const responseData: LoginResponse = JSON.parse(JSON.stringify(response.data))

        expect(responseData.token).toBe("")
        expect(responseData.error).toBe("Wrong email or password")
    })

    it('get token no password', async () => {
        const user: User = {
            name: "test",
            email: "test@test.com",
            password: "test123",
        }

        const usersService: UserService = new UserService()
        await usersService.create(user)

        const response = await axios.post('http://localhost:8081/api/auth/login', {
            email: user.email,
            password: ""
        })
        const responseData: LoginResponse = JSON.parse(JSON.stringify(response.data))

        expect(responseData.token).toBe("")
        expect(responseData.error).toBe("Wrong email or password")
    })
})