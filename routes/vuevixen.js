var express = require('express');
var router = express.Router();
var axios = require('axios')

const cheerio = require('cheerio')
const vuevixenUrl = 'https://vuevixens.org/'

router.get('/', function(req, res) {
    var result = {}
    var key = 'events'
    result[key] = []

    axios.get(`${vuevixenUrl}`).then(response => {
        const fullSite = cheerio.load(response.data)
        const selected = fullSite('div[class="flex event-name xs12 d-flex align-center justify-center"]')
        selected.find('div > div').each(function(index, element) {
            const location = element.children[0].children[0].data
            const date = element.children[1].children[0].data
            var event = {
                location: location,
                date: date
            }
            result[key].push(event)
        })
        res.send(JSON.stringify(result))
    }).catch(error => {
        res.error(error)
    });
});

module.exports = router;