var express = require('express');
var router = express.Router();
var { Op } = require('sequelize')
const db = require('../models/index');

router.get('/', function(req, res, next) {
  if(!req.query.id){//クエリのID指定が無い時は全件表示
    db.EventCat.findAll(
      {
        order: [
          ['id', 'ASC']
        ]
      }
    ).then(eves => {
      res.json(eves);
    });
  } else {
    db.EventCat.findByPk(
      req.query.id,
      {
        include: [
          {model: db.Event}
        ]
      }
    ).then(eve => {
      res.json(eve);
    });
  }
});

router.post('/add', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.EventCat.create({
    name: req.body.name
  }))
  .then(() => {
    res.redirect('/eventcats');
  })
  .catch(() => {
    res.redirect('/eventcats');
    console.log('新規作成失敗');
  });
});

router.get('/edit', function(req, res, next) {
  db.EventCat.findByPk(
    req.query.id
  ).then(eve => {
    res.render('eventcatUpdate', {eventcat: eve});
  });
});

router.post('/edit', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.EventCat.update(
    {
      name: req.body.name
    },
  {
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/eventcats');
  })
  .catch(() => {
    res.redirect('/eventcats');
    console.log('更新失敗');
  });
});

router.post('/delete', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.EventCat.destroy({
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/eventcats');
  })
  .catch(() => {
    res.redirect('/eventcats');
    console.log('削除失敗');
  });
});

module.exports = router;
