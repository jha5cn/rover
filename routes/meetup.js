var express = require('express');
var router = express.Router();
var axios = require('axios')

const apiKey = '21261b1d4773517d7b4f6e5f57611e68'
const meetupBaseUrl = 'https://api.meetup.com/'
const openEventsUrl = '2/open_events'
const topic = 'vue-js'

router.get('/', function(req, res) {
    axios.get(`${meetupBaseUrl}${openEventsUrl}`, {
        params: {
            key: apiKey,
            topic: topic,
            sign: true
        }
    }).then(response => {
        res.json(response.data)
    })
        .catch(error => {
            res.error(error)
        });
});

module.exports = router;
