var express = require('express');
var router = express.Router();
const db = require('../models/index');

/* GET home page. */
router.get('/', function(req, res, next) {

res.render('index', { title: 'Tour m.' });
  /* db.Event.findAll(
    {
      order: [
        ['date', 'ASC']
      ],
      include: [{model: db.Place}, {model: db.Tour}, {model: db.EventCat}, {model: db.EventSche}]
    }
  ).then(eves => {
    res.json(eves);
  }); */
  /* const attrs = Object.keys(db.User.rawAttributes);
  const timestamps = Object.values(db.User._timestampAttributes);
  const attributes = attrs.filter(attr => timestamps.indexOf(attr) < 0);

  console.log(attributes); */

  /* db.PlaceMemo.findAll(
    {
      order: [
        ['id', 'ASC']
      ],
      include: [{model: db.Place},{model: db.User}]
    }
  ).then(eves => {
    res.json(eves);
  }); */
});

module.exports = router;
