var express = require('express');
var router = express.Router();
var { Op } = require('sequelize')
const db = require('../models/index');

router.get('/', function(req, res, next) {
  if(!req.query.id){//クエリのID指定が無い時は全件表示
    db.EventSche.findAll(
      {
        order: [
          ['id', 'ASC']
        ]
      }
    ).then(eves => {
      res.json(eves);
    });
  } else {
    db.EventSche.findByPk(
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
  .then(() => db.EventSche.create({
    name: req.body.name,
    EventId: req.body.EventId,
    time: req.body.time,
    memo: req.body.memo
  }))
  .then(() => {
    res.redirect('/eventsches');
  })
  .catch(() => {
    res.redirect('/eventsches');
    console.log('新規作成失敗');
  });
});

router.get('/edit', function(req, res, next) {
  db.EventSche.findByPk(
    req.query.id
  ).then(eve => {
    res.render('eventscheUpdate', {eventsche: eve});
  });
});

router.post('/edit', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.EventSche.update(
    {
      name: req.body.name,
      EventId: req.body.EventId,
      time: req.body.time,
      memo: req.body.memo
    },
  {
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/eventsches');
  })
  .catch(() => {
    res.redirect('/eventsches');
    console.log('更新失敗');
  });
});

router.post('/delete', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.EventSche.destroy({
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/eventsches');
  })
  .catch(() => {
    res.redirect('/eventsches');
    console.log('削除失敗');
  });
});

module.exports = router;
