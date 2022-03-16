import express from "express"
import AuthService from "../services/auth"

const router = express.Router();

router.post('/login', async (req, res) => {
    const email:string = req.body.email
    const password:string = req.body.password
    let token: string = ""

    if((email && password) !== "") {
        const loginService: AuthService = new AuthService()
        token = await loginService.getToken(email, password)
    }

    res.send({
        token,
        error: token === "" ? "Wrong email or password" : null
    })
})

export default router