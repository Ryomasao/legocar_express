var express = require('express');
var router = express.Router();

//環境変数(.env)の読み込み
require('dotenv').config();

var myModule = require('../module');
myModule.getIP.sayhello();


var isGlobal = true;

var env = {
  connectTo_FLASK_WAN:process.env.NODE_FLASK_IP_WAN,
  connectTo_MPJG_WAN:process.env.NODE_MPJG_IP_WAN,
  connectTo_FLASK_LAN:process.env.NODE_FLASK_IP_LAN,
  connectTo_MPJG_LAN:process.env.NODE_MPJG_IP_LAN,
  isGlobal:isGlobal
}

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(myModule.getIP.getIP(req));
  res.render('controller/controller',{env:env});
});

module.exports = router;

