const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'cfb13279adc54804bb03596f7d36c432'
   });

const handleApiCall = () => (req, res) => {
    app.models
   .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
   .then(data => res.json(data))
   .catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (db) => (req, res) => {
    const { id } = req.body;
        db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => { res.json(entries[0].entries)})
        .catch(err => res.status(400).json('entradas nao localizadas'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};