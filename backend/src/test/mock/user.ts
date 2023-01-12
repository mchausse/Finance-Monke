import User from "../../interface/model/user"
import { v4 as uuidv4 } from 'uuid'
import { ObjectId } from "mongodb"

const users: User[] = [
    {
        id: new ObjectId(),
        token: uuidv4(),
        name: 'Max',
        email: 'max@gmail.com',
        password: '2022-03-04',
    },
    {
        id: new ObjectId(),
        token: uuidv4(),
        name: 'Maude',
        email: 'maude@gmail.com',
        password: '2022-02-06',
    },
    {
        id: new ObjectId(),
        token: uuidv4(),
        name: 'Eleanor',
        email: 'eleanor@gmail.com',
        password: '2022-02-06',
    }
]

export default users
