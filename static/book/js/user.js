/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-02-07 14:25:13
 * @version $Id$
 */

var user = function(){
      var obj = {};
      obj.submit = function(event){
          let username = $("#username").val();
          let password = $("#password").val();
          const data = {
          	username:username,
          	password:password
          }
          let datas = JSON.stringify(data)
          console.log(datas)
          $.ajax({
            url:'/book/register',
            type:'post',
            dataType : 'json',
            data:datas,
            success:function(res){
            	console.log(res)
            	if(res.result==0){
                  alert(res.message)
                  window.location.href="login.html"
            	}else{
                  alert(res.message)
            	}
            }
          })
      }

      obj.submitlogin = function(){
      	 let username = $("#username").val();
          let password = $("#password").val();
          const data = {
          	username:username,
          	password:password
          }
          let datas = JSON.stringify(data)
          console.log(datas)
          $.ajax({
            url:'/book/login',
            type:'post',
            dataType : 'json',
            data:datas,
            success:function(res){
            	console.log(res)
            	if(res.result==0){
                  alert(res.message)
            	}else{
                  alert(res.message)
            	}
            }
          })
      }


      return obj;
}()