const handleProfileGet = (db) => (req, res) => {
    const {id} = req.params;
    db.select('*').from('users')
        .where({id})
        .then(user => {
            if(user.length){
                res.json(user[0])
            } else {
                res.status(400).json('usuario nao encontrado')
            }
        })
        .catch(err => res.status(400).json('erro ao encontrar o usuario') )
}

module.exports = {
    handleProfileGet: handleProfileGet
}