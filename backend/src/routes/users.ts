import express from "express"
import UserServices from "../services/user"

const router = express.Router();

router.get('/', async (req, res) => {
    const usersServices: UserServices = new UserServices()
    const users = await usersServices.getAll()

    res.send(users)
})

router.get('/:id', async (req, res) => {
    const usersServices: UserServices = new UserServices()
    const users = await usersServices.get(req.params.id)

    res.send(users)
})

router.post('/', async (req, res) => {
    const usersServices: UserServices = new UserServices()
    const users = await usersServices.create(req.body)

    res.send(users)
})

router.delete('/:id', async (req, res) => {
    const usersServices: UserServices = new UserServices()
    const users = await usersServices.delete(req.params.id)

    res.send({
        "Number of transactions deleted": users
    })
})

export default router