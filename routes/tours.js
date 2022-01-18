var express = require('express');
var router = express.Router();
var { Op } = require('sequelize')
const db = require('../models/index');

router.get('/', function(req, res, next) {
  if(!req.query.id){//クエリのID指定が無い時は全件表示
    db.Tour.findAll(
      {
        order: [
          ['id', 'ASC']
        ]
      }
    ).then(pls => {
      res.json(pls);
    });
  } else {
    db.Tour.findByPk(
      req.query.id,
      {
        include: [{
         model: db.Event
        }]
      }
    ).then(pl => {
      res.json(pl);
    });
  }
});

router.post('/add', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.Tour.create({
    name: req.body.name,
    date: req.body.date,
    EventId: req.body.EventId,
    iconColor: req.body.iconColor,
    memo: req.body.memo,
    removed: false,
    favorite: false,
    done: false
  }))
  .then(() => {
    res.redirect('/tours');
  })
  .catch(() => {
    res.redirect('/tours');
    console.log('新規作成失敗');
  });
});

router.get('/edit', function(req, res, next) {
  db.Tour.findByPk(
    req.query.id
  ).then(pl => {
    res.render('tourUpdate', {tour: pl});
  });
});

router.post('/edit', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.Tour.update({
    name: req.body.name,
    date: req.body.date,
    EventId: req.body.EventId,
    iconColor: req.body.iconColor,
    memo: req.body.memo,
    removed: req.body.removed,
    favorite: req.body.favorite,
    done: req.body.done
  },
  {
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/tours');
  })
  .catch(() => {
    res.redirect('/tours');
    console.log('更新失敗');
  });
});

router.post('/delete', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.Tour.destroy({
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/tours');
  })
  .catch(() => {
    res.redirect('/tours');
    console.log('削除失敗');
  });
});

module.exports = router;
