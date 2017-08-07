var express = require('express');
var router = express.Router();

//環境変数(.env)の読み込み
require('dotenv').config();

//外部モジュールをライブラリっぽく使う方法。
//../moduleにindex.jsを置くと、以下の書き方で、index.jsを読み込む
//index.jsの中で、個別にrequrie()している。
//myModule.getIP.getIP()みたな形で使える。
var myModule = require('../module');



//とりあえずtrueで設定。まだ使わない。
//var isGlobal = true;


//接続先環境情報
var env = {
  //connectTo_FLASK_WAN:process.env.NODE_FLASK_IP_WAN,
  //connectTo_MPJG_WAN:process.env.NODE_MPJG_IP_WAN,
  //connectTo_FLASK_LAN:process.env.NODE_FLASK_IP_LAN,
  //connectTo_MPJG_LAN:process.env.NODE_MPJG_IP_LAN,
  //isGlobal:isGlobal
}

/* GET home page. */
router.get('/', function(req, res, next) {
  //ここでアクセス元がローカルエリア内か、外部からを判断した結果をisGlobalとして管理したい。
  //とりあえずは、ブラウザ側で選んでもらうようにする。
  //console.log(myModule.getIP.getIP(req));

  if(req.query.mode === "WAN"){
    env.connectTo_FLASK = process.env.NODE_FLASK_IP_WAN
    env.connectTo_MPJG = process.env.NODE_MPJG_IP_WAN
    env.state = "WAN";
  }else{
    env.connectTo_FLASK = process.env.NODE_FLASK_IP_LAN
    env.connectTo_MPJG = process.env.NODE_MPJG_IP_LAN
    env.state = "LAN";
  }

  res.render('controller/controller',{env:env});
});

module.exports = router;

