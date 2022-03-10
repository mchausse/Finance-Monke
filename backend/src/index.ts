import bodyParser from "body-parser"
import express from "express"
import transactions from "./routes/transactions"
import users from "./routes/users"

const app = express()
const port = 8081

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api/transactions", transactions)
app.use("/api/users", users)


app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` )
} );