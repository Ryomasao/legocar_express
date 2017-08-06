var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('practicecss/practicetop', { title: 'Express' });
});

router.get('/css', function(req, res, next) {
  res.render('practicecss/practicecss', { title: 'Express' });
});

//レスポンシブもそうだけど、画像の切り替えとかのjqueryとかもここで実験してる。
//viewportの指定あり。
router.get('/responsive/3', function(req, res, next) {
  res.render('responsive/sample_responsive03', { title: 'Express' });
});

//viewportの指定なし
router.get('/responsive/2', function(req, res, next) {
  res.render('responsive/sample_responsive02', { title: 'Express' });
});

module.exports = router;