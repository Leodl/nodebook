/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-02-07 13:11:46
 * @version $Id$
 */

const express = require('express');
const service = require('./service.js')
const router =express.Router();


// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  // console.log('Time: ', Date.now());
  next();
});

// 定义网站主页的路由
router.post('/book/register',service.register)
router.post('/book/login',service.login)






module.exports = router;
