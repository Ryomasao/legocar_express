var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*jade練習用のオブジェクト */
var package = {
  title: '最高にクールなホームページ',
  description: '最高にクールなホームページです。見ないと損です。',
  keywords: [
    '最高',
    'クール',
    '世界一',
    '天才'
  ],
  robots: [
    'INDEX',
    'FOLLOW',
    'NOODP',
    'NOYDIR',
    'NOARCHIVE'
  ]
};


var simple = {
  title:'test',
  description:'test2'
};



/*jade練習用のページ */
router.get('/practicejade', function(req, res, next) {
 // res.render('practicejade', {test:{key1:'a',key2:'b'}});
  res.render('practicejade',{package:package});
});




module.exports = router;
