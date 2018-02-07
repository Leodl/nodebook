/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-02-05 17:27:01
 * @version $Id$
 */

const express = require('express');
const db = require('./db.js');
const path = require('path')


const app = express();

app.use(express.static(path.join(__dirname,'../', 'static','book')));

app.get('/booklist',function(req,res){
      var sql = 'select * from bookAll '
      var data = [];

     db.base(sql,data,function(result){
	 console.log(res)
	 res.json(result);

})

})




app.listen(8010,function(result){
	console.log("running...")
})