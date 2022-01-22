var express = require('express');
var router = express.Router();
var { Op } = require('sequelize')
const db = require('../models/index');


const modelColums = Object.keys(db.User.rawAttributes);//指定モデルのカラム名一覧取得
const removals = ['id', 'createdAt','updatedAt'];//除外したいカラム名
const targetColums = modelColums.filter(x => {return ! removals.includes(x)});
const syncColums = targetColums.map(x => {return (x + ': req.body.'+x)});
//console.log(syncColums);

router.get('/', function(req, res, next) {
  if(!req.query.id){//クエリのID指定が無い時は全件表示
    db.User.findAll(
      {
        order: [
          ['id', 'ASC']
        ]
      }
    ).then(uss => {
      res.json(uss);
    });
  } else {
    db.User.findByPk(
      req.query.id
    ).then(us => {
      res.json(us);
    });
  }
});

router.post('/add', function(req, res, next) {
  
  db.sequelize.sync()
  .then(() => db.User.create({
    name: req.body.name,
    password: req.body.password,
    removed: false,
  }))
  .then(() => {
    res.redirect('/users');
  })
  .catch(() => {
    res.redirect('/users');
    console.log('新規作成失敗');
  });
});

router.get('/edit', function(req, res, next) {
  db.User.findByPk(
    req.query.id
  ).then(us => {
    res.render('userUpdate', {user: us});
  });
});

router.post('/edit', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.User.update({
    name: req.body.name,
    password: req.body.password,
    removed: req.body.removed,
  },
  {
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/users');
  })
  .catch(() => {
    res.redirect('/users');
    console.log('更新失敗');
  });
});

router.post('/delete', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.User.destroy({
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/users');
  })
  .catch(() => {
    res.redirect('/users');
    console.log('削除失敗');
  });
});

module.exports = router;
