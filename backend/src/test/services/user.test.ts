import User from '../../interface/model/user'
import db from '../../db/database'
import UserServices from '../../services/user'
import usersData from '../mock/user'


beforeAll(async () => {
    await db.sequelize.sync({ force: true })
})

describe("Testing the user service", () => {

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


        const userServices: UserServices = new UserServices()
        const usersFound = await userServices.getAll()

        expect(usersFound).not.toBeUndefined()
        expect(usersFound).not.toBeNull()

        for(let i = 0; i < users.length; i++) {
            expect(usersFound[i].id).toEqual(usersData[i].id)
            expect(usersFound[i].token).toEqual(usersData[i].token)
            expect(usersFound[i].name).toEqual(usersData[i].name)
            expect(usersFound[i].email).toEqual(usersData[i].email)
            expect(usersFound[i].password).toEqual(usersData[i].password)
        }
    })

    it('get user', async () => {
        let user: User

        try {
            user = await db.User.create(usersData[2])

        } catch(error) {
            console.log(error)
            fail()
        }

        const userServices: UserServices = new UserServices()
        const userFound = await userServices.get(user.id)

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

        const usersServices: UserServices = new UserServices()
        const userCreated = await usersServices.create(user)

        expect(userCreated).not.toBeUndefined()
        expect(userCreated).not.toBeNull()
        expect(userCreated.id).not.toBeUndefined()
        expect(userCreated.token).not.toBeUndefined()

        expect(userCreated.name).toEqual(user.name)
        expect(userCreated.email).toEqual(user.email)
        expect(userCreated.password).toEqual(user.password)
    })

    it('delete user', async () => {
        let users: User[]
        let nbusersBefore: number
        let nbusersAfter: number

        try {
            users = await db.User.findAll()
            nbusersBefore = users.length

        } catch(error) {
            console.log(error)
            fail()
        }

        const usersServices: UserServices = new UserServices()
        const userDeleted = await usersServices.delete(usersData[0].id)

        expect(userDeleted).not.toBeUndefined()
        expect(userDeleted).not.toBeNull()

        expect(userDeleted).toBe(1)

        try {
            nbusersAfter = (await db.User.findAll()).length

        } catch(error) {
            console.log(error)
            fail()
        }

        expect(nbusersAfter).toBe(nbusersBefore - 1)
    })
})

afterAll(async () => {
    await db.sequelize.close()
});