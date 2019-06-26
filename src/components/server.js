const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:31e2c567-cec2-4bca-839e-ec071e9f9eb9',
    key: 'a8fa40ed-495e-4987-9938-777e33220a8a:QOOzqC552Bz1XhRcaJKWadvKFVmv/aGZS4SUXrm+0qE='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
    const { username } = req.body
    chatkit
        .createUser({
            id: username,
            name: username
        })
        .then(() => res.sendStatus(201))
        .catch(error => {
            if(error.error === 'service/chatkit/user_already_exists') {
                res.sendStatus(200)
            }
            else{
                res.status(error.status).json(error)
            }
        })
})

app.post('/authenticate', (req, res) => {
    const authData = chatkit.authenticate({ userId: req.query.user_id })
    res.status(authData.status).send(authData.body)
})

const PORT = 3001
app.listen(PORT, err =>{
    if(err) {
        console.error(err)
    }
    else {
        console.log('Running on port ${PORT}')
    }
})