import bodyParser from "body-parser"
import express from "express"
import home from "./routes/expenses/expenses"

const app = express()
const port = 8081

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/expenses", home)


app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` )
} );