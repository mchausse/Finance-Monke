import User from '../../interface/model/user'
import db from '../../db/database'
import UserServices from '../../services/user'
import axios from 'axios'
import usersData from '../mock/user'


beforeAll(async () => {
    await db.sequelize.sync({ force: true })
})

describe("Testing the user routes", () => {

    it('get all users', async () => {
        let users: User[]

        try {
            await db.User.create(usersData[0])
            await db.User.create(usersData[1])
            users = await db.User.findAll()

        } catch(error) {
            console.log(error)
            fail()
        }

        const response = await axios.get('http://localhost:8081/api/users')
        const usersFound: User[] = JSON.parse(JSON.stringify(response.data)) as User[]

        expect(usersFound).not.toBeUndefined()
        expect(usersFound).not.toBeNull()

        for(let i = 0; i < users.length; i++) {
            expect(usersFound[i].id).toEqual(users[i].id)
            expect(usersFound[i].token).toEqual(users[i].token)
            expect(usersFound[i].name).toEqual(users[i].name)
            expect(usersFound[i].email).toEqual(users[i].email)
            expect(usersFound[i].password).toEqual(users[i].password)
        }
    })

    it('get user', async () => {

        const response = await axios.get('http://localhost:8081/api/users')
        const usersFound: User[] = JSON.parse(JSON.stringify(response.data)) as User[]

        if(usersFound.length < 1) fail()

        const user: User = usersFound[0]
        const usersServices: UserServices = new UserServices()
        const userFound = await usersServices.get(user.id)

        expect(userFound).not.toBeUndefined()
        expect(userFound).not.toBeNull()

        expect(userFound.id).toEqual(user.id)
        expect(userFound.token).toEqual(user.token)
        expect(userFound.name).toEqual(user.name)
        expect(userFound.email).toEqual(user.email)
        expect(userFound.password).toEqual(user.password)
    })

    it('create user', async () => {
        const user: User = {
            name: "test",
            email: "test@test.com",
            password: "test123",
        }

        const response = await axios.post('http://localhost:8081/api/users', user)
        const userCreated: User = JSON.parse(JSON.stringify(response.data)) as User

        expect(userCreated).not.toBeUndefined()
        expect(userCreated).not.toBeNull()
        expect(userCreated.id).not.toBeUndefined()
        expect(userCreated.token).not.toBeUndefined()

        expect(userCreated.name).toEqual(user.name)
        expect(userCreated.email).toEqual(user.email)
        expect(userCreated.password).toEqual(user.password)
    })

})

afterAll(async () => {
    await db.sequelize.close()
});