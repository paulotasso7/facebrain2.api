const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/Register/register'); 
const signin = require('./controllers/SignIn/signin.js');
const profile = require('./controllers/Profile/profile.js');
const image = require('./controllers/Image/image.js');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'paulotasso',
        password : 'B@tousay7',
        database : 'smart-brain'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {res.send('sucess')})
app.post('/signin', signin.handleSignIn(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', image.handleApiCall())

app.listen(3000, ()=> {
    console.log('app is running on port 3000')
})





