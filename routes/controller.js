var express = require('express');
var router = express.Router();

//環境変数(.env)の読み込み
require('dotenv').config();

const connectTo = process.env.NODE_FLASK_IP;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('controller/controller',{connectTo:connectTo});
});

module.exports = router;
