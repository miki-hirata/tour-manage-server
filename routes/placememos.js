var express = require('express');
var router = express.Router();
var { Op } = require('sequelize')
const db = require('../models/index');

router.get('/', function(req, res, next) {
  if(!req.query.id){//クエリのID指定が無い時は全件表示
    db.PlaceMemo.findAll(
      {
        order: [
          ['id', 'ASC']
        ]
      }
    ).then(eves => {
      res.json(eves);
    });
  } else {
    db.PlaceMemo.findByPk(
      req.query.id,
      {
        include: [
          {model: db.Place},
          {model: db.User}
        ]
      }
    ).then(eve => {
      res.json(eve);
    });
  }
});

router.post('/add', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.PlaceMemo.create({
    memo: req.body.memo,
    PlaceId: req.body.PlaceId,
    UserId: req.body.UserId,
    removed: false
  }))
  .then(() => {
    res.redirect('/placememos');
  })
  .catch(() => {
    res.redirect('/placememos');
    console.log('新規作成失敗');
  });
});

router.get('/edit', function(req, res, next) {
  db.PlaceMemo.findByPk(
    req.query.id
  ).then(eve => {
    res.render('placememoUpdate', {placememo: eve});
  });
});

router.post('/edit', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.PlaceMemo.update(
    {
      memo: req.body.memo,
      PlaceId: req.body.PlaceId,
      UserId: req.body.UserId,
      removed: req.body.removed
    },
  {
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/placememos');
  })
  .catch(() => {
    res.redirect('/placememos');
    console.log('更新失敗');
  });
});

router.post('/delete', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.PlaceMemo.destroy({
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/placememos');
  })
  .catch(() => {
    res.redirect('/placememos');
    console.log('削除失敗');
  });
});

module.exports = router;
