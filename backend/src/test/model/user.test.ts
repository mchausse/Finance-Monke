import { collections } from '../../db/database'
import usersData from '../mock/user'
import User from '../../interface/model/user'

describe("Testing the user models", () => {

    it('create user', async () => {
        try {
            await collections.users.insertOne(usersData[0])
            const userCreated = await collections.users.findOne({_id: usersData[0].id})

            expect(userCreated).not.toBeUndefined()
            expect(userCreated).not.toBeNull()

            expect(userCreated.id).toEqual(usersData[0].id)
            expect(userCreated.token).toEqual(usersData[0].token)
            expect(userCreated.name).toEqual(usersData[0].name)
            expect(userCreated.email).toEqual(usersData[0].email)
            expect(userCreated.password).toEqual(usersData[0].password)
        } catch(error) {
            console.log(error)
            fail()
        }
    })

    it('get user', async () => {
        try {
            const userFound = await collections.users.findOne({ where: { id: usersData[0].id }})

            expect(userFound).not.toBeUndefined()
            expect(userFound).not.toBeNull()

            expect(userFound.id).toEqual(usersData[0].id)
            expect(userFound.token).toEqual(usersData[0].token)
            expect(userFound.name).toEqual(usersData[0].name)
            expect(userFound.email).toEqual(usersData[0].email)
            expect(userFound.password).toEqual(usersData[0].password)
        } catch(error) {
            console.log(error)
            fail()
        }
    })

    it('get all users', async () => {
        let usersFound: User[]

        try {
            await collections.users.insertOne(usersData[1] as any)
            usersFound = await collections.users.find<User>({}).toArray() as User[]
        } catch(error) {
            console.log(error)
            fail()
        }

        expect(usersFound).not.toBeUndefined()
        expect(usersFound.length).toEqual(2)

        for(let i = 0; i < usersFound.length; i++) {
            expect(usersFound[i].id).toEqual(usersData[i].id)
            expect(usersFound[i].token).toEqual(usersData[i].token)
            expect(usersFound[i].name).toEqual(usersData[i].name)
            expect(usersFound[i].email).toEqual(usersData[i].email)
            expect(usersFound[i].password).toEqual(usersData[i].password)
        }
    })

    it('remove a user', async () => {
        try {
            await collections.users.deleteOne({ _id: usersData[0].id })
            const userDeleted: User = await collections.users.findOne<User>({ _id: usersData[0].id }) as User

            expect(userDeleted).not.toBeUndefined()
            expect(userDeleted).not.toBeNull()

            expect(userDeleted).toEqual(1)
        } catch(error) {
            console.log(error)
            fail()
        }
    })
})