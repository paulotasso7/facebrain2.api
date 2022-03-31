const handleSignIn = (db, bcrypt) => (req, res) => {
    const {password, email} = req.body;
    if(!password || !email) {
        return res.status(400).json('incorrect form submission');
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid) {
            return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('não foi possivel encontrar o usuário'))
        }
        else {
            res.status(400).json('dados incorretos')
        }
    })
    .catch(err => {res.status(400).json('dados incorretos')})
}

module.exports = {
    handleSignIn: handleSignIn
};