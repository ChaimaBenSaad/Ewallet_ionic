var express = require('express');
var router = express.Router();
var db = require('../db');


/* GET users listing. */
router.get('/list', function(req, res, next) {
  var result = db.selectUsers().then(function (value) {
  console.log("result users");
  console.log(value[0].id);
  res.render('users', { title: 'Playcoin Wallet users list',accounts:value});
  });
 });

module.exports = router;
