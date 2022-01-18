var express = require('express');
var router = express.Router();
var { Op } = require('sequelize')
const db = require('../models/index');


const modelColums = Object.keys(db.Place.rawAttributes);//指定モデルのカラム名一覧取得
const removals = ['id', 'createdAt','updatedAt'];//除外したいカラム名
const targetColums = modelColums.filter(x => {return ! removals.includes(x)});
const syncColums = targetColums.map(x => {return (x + ': req.body.'+x)});
//console.log(syncColums);

router.get('/', function(req, res, next) {
  if(!req.query.id){//クエリのID指定が無い時は全件表示
    db.Place.findAll(
      {
        order: [
          ['id', 'ASC']
        ],
        include: [{
        model: db.Event
      }]
      }
    ).then(pls => {
      res.json(pls);
    });
  } else {
    db.Place.findByPk(
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
  .then(() => db.Place.create({
    PlaceCatId: req.body.PlaceCatId,
    name: req.body.name,
    memo: req.body.memo,
    country: req.body.country,
    postalCode: req.body.postalCode,
    prefecture: req.body.prefecture,
    city: req.body.city,
    street: req.body.street,
    tel: req.body.tel,
    fax: req.body.fax,
    removed: false,
    favorite: false,
  }))
  .then(() => {
    res.redirect('/places');
  })
  .catch(() => {
    res.redirect('/places');
    console.log('新規作成失敗');
  });
});

router.get('/edit', function(req, res, next) {
  db.Place.findByPk(
    req.query.id
  ).then(pl => {
    res.render('placeUpdate', {place: pl});
  });
});

router.post('/edit', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.Place.update({
    PlaceCatId: req.body.PlaceCatId,
    name: req.body.name,
    memo: req.body.memo,
    country: req.body.country,
    postalCode: req.body.postalCode,
    prefecture: req.body.prefecture,
    city: req.body.city,
    street: req.body.street,
    tel: req.body.tel,
    fax: req.body.fax,
    removed: req.body.removed,
    favorite: req.body.favorite
  },
  {
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/places');
  })
  .catch(() => {
    res.redirect('/places');
    console.log('更新失敗');
  });
});

router.post('/delete', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.Place.destroy({
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/places');
  })
  .catch(() => {
    res.redirect('/places');
    console.log('削除失敗');
  });
});

module.exports = router;
