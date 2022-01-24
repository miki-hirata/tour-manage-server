var express = require('express');
var router = express.Router();
var { Op } = require('sequelize')
const db = require('../models/index');

//カラム名からcreate,add条件を自動生成 →　create/addへの組み込みに失敗したので、ログをコピペする
const modelColums = Object.keys(db.Event.rawAttributes);//指定モデルのカラム名一覧取得
const removals = ['id', 'createdAt','updatedAt'];//除外したいカラム名
const targetColums = modelColums.filter(x => {return ! removals.includes(x)});
const syncColums = targetColums.map(x => {return (x + ': req.body.'+x)});
//console.log(syncColums);

router.get('/', function(req, res, next) {
  if(!req.query.id){//クエリのID指定が無い時は全件表示
    db.Event.findAll(
      {
        order: [
          ['date', 'ASC']
        ],
        include: [
          {model: db.Place}, {model: db.Tour}, {model: db.EventCat}, {model: db.EventSche}
        ]
      }
    ).then(eves => {
      res.json(eves);
    });
  } else {
    db.Event.findByPk(
      req.query.id,
      {
        include: [
          {model: db.Place}, {model: db.Tour}, {model: db.EventCat}, {model: db.EventSche}
        ]
      }
    ).then(eve => {
      res.json(eve);
    });
  }
});

router.get('/sches', function(req, res, next) {
  db.EventSche.findAll(
    {
      where: {EventId: req.query.id},
      order: [
        ['time', 'ASC']
      ]
    }
  ).then(sches => {
    res.json(sches);
  });
});


router.post('/add', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.Event.create({
    name: req.body.name,
    date: req.body.date,
    PlaceId: req.body.PlaceId,
    TourId: req.body.TourId,
    EventCatId: req.body.EventCatId,
    memo: req.body.memo,
    removed: false,
    favorite: false
  }))
  .then(() => {
    res.redirect('/events');
  })
  .catch(() => {
    res.redirect('/events');
    console.log('新規作成失敗');
  });
});

router.get('/edit', function(req, res, next) {
  db.Event.findByPk(
    req.query.id
  ).then(eve => {
    res.render('eventUpdate', {event: eve});
  });
});

//日付が空欄になってしまう問題
//空欄のまま送信するとエラーになる
router.post('/edit', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.Event.update(
    {
      name: req.body.name,
      date: req.body.date,
      PlaceId: req.body.PlaceId,
      TourId: req.body.TourId,
      EventCatId: req.body.EventCatId,
      memo: req.body.memo,
      removed: req.body.removed,
      favorite: req.body.favorite
    },
  {
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/events');
  })
  .catch(() => {
    res.redirect('/events');
    console.log('更新失敗');
  });
});

router.post('/delete', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.Event.destroy({
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/events');
  })
  .catch(() => {
    res.redirect('/events');
    console.log('削除失敗');
  });
});

module.exports = router;
