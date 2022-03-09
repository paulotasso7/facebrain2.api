const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());


const database = {
    users: [
        {
            id: '123',
            name: 'Doe',
            email: 'doe@gmail.com',
            // password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Moe',
            email: 'moe@gmail.com',
            // password: 'curupira',
            entries: 0,
            joined: new Date()
        },
        {
            id: '125',
            name: 'Boe',
            email: 'boe@gmail.com',
            // password: 'ramirez',
            entries: 0,
            joined: new Date()
        },
        {
            id: '126',
            name: 'Poe',
            email: 'poe@gmail.com',
            password: 'meet',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'doe@gmail.com'
        }
    ]
}

idChecker = (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach( user => {
        if(user.id === id) {
            found = true;
           return res.json(user);
        } 
    })
    if(!found) {
        res.status(400).json('not found');
    }
}

entriesCounter = (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach( user => {
        if(user.id === id) {
            found = true;
            user.entries++
           return res.json(user.entries);
        } 
    })
    if(!found) {
        res.status(400).json('not found');
    }
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {

    bcrypt.compare("meet", '$2a$10$lqysVXnt43PxwX2nERbuEehkhnA/R3DT3oZe9.3jbeGtpo9hoxcu.', function(err, res) {
        console.log('1st guess', res)
    });
    bcrypt.compare("veggies", '$2a$10$lqysVXnt43PxwX2nERbuEehkhnA/R3DT3oZe9.3jbeGtpo9hoxcu.', function(err, res) {
        console.log('2nd guess', res)
    });

    if( req.body.email === database.users[3].email &&
        req.body.password === database.users[3].password) {
            res.json('sucess')
        } else {
            res.status(400).json('err logging in');
        }
    
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;

    database.users.push ({
        id: '127',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req,res) => {
   idChecker(req, res);
})

app.put('/image', (req, res) => {
    entriesCounter(req, res);
})

app.listen(3000, ()=> {
    console.log('app is running on  port 3000')
})





