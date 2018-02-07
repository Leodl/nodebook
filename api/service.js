/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-02-07 13:57:37
 * @version $Id$
 */

const db = require('./db.js');
const path = require('path');


//注册功能
exports.register = function(req,res){

   let info = req.body

   var user = {}
    for(let key in info){
        user = key;
    }
   var userdata = JSON.parse(user)

   let sql = 'select * from user '
   db.base(sql,null,function(result){

   	var obj = {};
   	for(let i = 0;i<result.length;i++){
   		if(result[i].username==userdata.username){
   			obj.result=-1;
   			obj.message="用户名已存在";
         }
     }

       if(obj.hasOwnProperty("result")){
           res.json(obj)
         }else{
         	let sql='insert user set?';
         	let data = {
         		username:userdata.username,
         		password:userdata.password
         	}
         	db.base(sql,data,function(){
         		let obj = {
         			result:0,
         			message:"注册成功"
         		}
         		res.json(obj)
         	})
         }


      })

  
}

//登录接口

exports.login = function(req,res){

   let info = req.body

   var user = {}
    for(let key in info){
        user = key;
    }
   var userdata = JSON.parse(user)

   let sql = 'select * from user '
   db.base(sql,null,function(result){

   	var obj = {};
   	for(let i = 0;i<result.length;i++){
   		if(result[i].username==userdata.username&&result[i].password==userdata.password){
   			obj.result=0;
   			obj.message="登录成功";
         }
     
         if(result[i].username==userdata.username&&result[i].password!==userdata.password){
            obj.result=-1;
   			obj.message="密码错误";
         }

      //      if(result[i].username!==userdata.username){
      //       obj.result=-1;
   			// obj.message="您还没有注册";
   			// return;
      //    }
     }



       if(obj.hasOwnProperty("result")){
           res.json(obj)
         }

})
}