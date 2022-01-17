var express = require('express');
var router = express.Router();
const db = require('../models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  db.Event.findAll(
    {
      order: [
        ['date', 'ASC']
      ],
      include: [{model: db.Place}, {model: db.Tour}, {model: db.EventCat}]
    }
  ).then(eves => {
    res.json(eves);
  });
});

module.exports = router;
