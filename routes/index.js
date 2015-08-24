var crypto = require('crypto'),
    User = require('../models/user.js');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {
    title: '��ҳ',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.get('/login', function(req, res, next) {
  res.render('login',{ title: 'Express',supplies: ['mop', 'broom', 'duster']});
});
router.get('/reg', function (req, res) {
  res.render('reg', {
    title: 'ע��',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.post('/reg', function (req, res) {
  var name = req.body.name,
      password = req.body.password,
      password_re = req.body['password-repeat'];
  //�����û���������������Ƿ�һ��
  if (password_re != password) {
    req.flash('error', '������������벻һ��!');
    return res.redirect('/reg');//����ע��ҳ
  }
  //��������� md5 ֵ
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
    name: name,
    password: password,
    email: req.body.email
  });
  //����û����Ƿ��Ѿ�����
  User.get(newUser.name, function (err, user) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/');
    }
    if (user) {
      req.flash('error', '�û��Ѵ���!');
      return res.redirect('/reg');//����ע��ҳ
    }
    //����������������û�
    newUser.save(function (err, user) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');//ע��ʧ�ܷ�������ҳ
      }
      req.session.user = user;//�û���Ϣ���� session
      req.flash('success', 'ע��ɹ�!');
      res.redirect('/');//ע��ɹ��󷵻���ҳ
    });
  });
});

router.post('/login', function (req, res) {
});
router.get('/post', function (req, res) {
  res.render('post', { title: '����' });
});
router.post('/post', function (req, res) {



});
router.get('/logout', function (req, res) {
});


module.exports = function(app){

};
