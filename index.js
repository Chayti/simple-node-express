// server side
var cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.port || 3000

app.get('/', (req, res) => {
    res.send('Hello World! I am Chayti. I am happy')
})

const users = [
    { id: 0, name: "sabana", email: "sabana@gmail.com" },
    { id: 1, name: "ruksana", email: "ruksana@gmail.com" },
    { id: 2, name: "kamali", email: "ramali@gmail.com" },
    { id: 3, name: "babana", email: "babana@gmail.com" },
    { id: 4, name: "pabana", email: "pabana@gmail.com" },
]

app.get('/users', (req, res) => {
    const search = req.query.search
    if (search) {
        res.send(users.filter(user => user.name.toLowerCase().includes(search.toLowerCase())))
    } else {
        res.send(users)
    }
})

app.get('/users/:userId', (req, res) => {
    res.send(users[req.params.userId])
    // res.send(users.filter(user => user.id == req.params.userId))
})

app.post('/users', (req, res) => {
    const newUser = req.body
    newUser.id = users.length
    users.push(newUser)
    console.log('hitting post', req.body)
    // res.send(JSON.stringify(newUser))
    res.json(newUser)
})

app.get('/fruits/mango/fazli', (req, res) => {
    console.log('yummy yummu fazli')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})