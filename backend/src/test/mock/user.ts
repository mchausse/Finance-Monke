import User from "../../interface/user"
import { v4 as uuidv4 } from 'uuid'

const users: User[] = [
    {
        id: uuidv4(),
        token: uuidv4(),
        name: 'Max',
        email: 'Food',
        password: '2022-03-04',
    },
    {
        id: uuidv4(),
        token: uuidv4(),
        name: 'Maude',
        email: 'Furniture',
        password: '2022-02-06',
    },
    {
        id: uuidv4(),
        token: uuidv4(),
        name: 'Eleanor',
        email: 'Alcool',
        password: '2022-02-06',
    }
]

export default users
