/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-02-07 14:25:13
 * @version $Id$
 */

var user = function(){
      var obj = {};
      obj.submit = function(event){
          var username = $("#username").val();
          var password = $("#password").val();
            if(username==""||password==""){
            swal("用戶名密碼不能為空","You clicked the button!","warning");
          }
          const data = {
          	username:username,
          	password:password
          }
          var datas = JSON.stringify(data)
          console.log(datas)
          $.ajax({
            url:'/book/register',
            type:'post',
            dataType : 'json',
            data:datas,
            success:function(res){
            	console.log(res)
            	if(res.result==0){
                  swal(res.message,"You clicked the button!","warning")
                  window.location.href="login.html"
            	}else{
                  swal(res.message,"You clicked the button!","warning")
            	}
            }
          })
      }

      obj.submitlogin = function(){
      	  var username = $("#username").val();
          var password = $("#password").val();
          if(username==""||password==""){
            swal("用戶名密碼不能為空","You clicked the button!","warning");
          }
          const data = {
          	username:username,
          	password:password
          }
          var datas = JSON.stringify(data)
          console.log(datas)
          $.ajax({
            url:'/book/login',
            type:'post',
            dataType : 'json',
            data:datas,
            success:function(res){
            	console.log(res)
            	if(res.result==0){
                  swal(res.message)
                  window.location.href="bookhome.html"
            	}else{
                  swal(res.message,"请先注册","warning")
            	}
            }
          })
      }

      obj.booklist = function(){

      	 $.ajax({
            url:'/book/booklist',
            type:'get',
            dataType : 'json',
            success:function(res){
            	console.log(res.data);
            	var html = "";
            	$.map(res.data,function(val,i){
            		html+="<tr valid='val.id'><td>"+i+"</td><td>"+val.bookname+"</td><td>"+val.auter+"</td><td>"+val.decript+"</td><td><button onclick='user.edit(this)' valid='"+val.id+"' type='button' class='btn btn-primary'>编辑</button><button valid='"+val.id+"' onclick='user.delete(this)' type='button' class='btn btn-danger' style='margin-left: 10px;''>删除</button></td></tr>"
            	})
            	$("#tbody").html(html)
            }
        })
            
      }

      obj.bookhomesure = function(){
      	 var bookname = $("#bookname").val();
      	 var autername = $("#autername").val();
      	 var bookdec = $("#bookdec").val();
      	 console.log(bookname+"=="+autername+"=="+bookdec)
      	 if(bookname==""||autername==""||bookdec==""){
            swal("不能为空","You clicked the button!","warning");
            return;
      	 }
      	 var data = {
      	 	bookname:bookname,
      	 	auter:autername,
      	 	decript:bookdec
      	 }
      	 var datas = JSON.stringify(data);
      	 $.ajax({
      	 	url:'/book/addbook',
      	 	type:'post',
      	 	dataType : 'json',
            data:datas,
            success:function(res){
              console.log(res)
              $('#exampleModal').modal('hide');
              obj.booklist();

            }

      	 })
      	
      	
      }

      obj.delete = function(dom){
      	var id = $(dom).attr("valid");
      	$.ajax({
      		url:'/book/delete/'+id+'',
      		type:'delete',
      		dataType : 'json',
      		success:function(res){
      			if(res.result==0){
                   swal(res.message,"You clicked the button!","success")
                   obj.booklist();
      			}
      		}

      	})

      }

      obj.edit = function(dom){
      	var bookname = $(dom).parent().parent().find("td:eq(1)").text();
      	var auter = $(dom).parent().parent().find("td:eq(2)").text();
      	var decript = $(dom).parent().parent().find("td:eq(3)").text();
      	var index = $(dom).parent().parent().index();
      	var id = $(dom).attr("valid");
      	console.log(bookname)
      	$(dom).parent().parent().html("<td>"+index+"</td><td><input type='text' value='"+bookname+"' /></td><td><input type='text' value='"+auter+"' /></td><td><input type='text' value='"+decript+"' /></td><td><button onclick='user.update(this)' valid='"+id+"' type='button' class='btn btn-primary'>确定</button><button valid='"+id+"' onclick='user.booklist()' type='button' class='btn btn-danger' style='margin-left: 10px;''>取消</button></td>");
      
      }

      obj.update = function(dom){
      	var bookname = $(dom).parent().parent().find("td:eq(1)").find("input").val();
      	var auter = $(dom).parent().parent().find("td:eq(2)").find("input").val();
      	var decript = $(dom).parent().parent().find("td:eq(3)").find("input").val();
      	var index = $(dom).parent().parent().index();
      	var id = $(dom).attr("valid");
      	var data = {
        	id:id,
        	bookname:bookname,
        	auter:auter,
        	decript:decript
        }
        var datas = JSON.stringify(data)
      	$.ajax({
      		url:'/book/update',
      		type:'put',
      		dataType : 'json',
      		data:datas,
      		success:function(res){
              if(res.result==0){
                 swal(res.message,"You clicked the button!","success");
                 obj.booklist();
              }
      		}
      	})

      }

      obj.search = function(){
      	var bookname = $("#searchbook").val();
      	console.log(bookname)

      	$.ajax({
      		url:'/book/search',
      		type:'post',
      		dataType : 'json',
      		data:{bookname:bookname},
      		success:function(res){
      			if(res.result==0){
                   swal(res.message,"You clicked the button!","success");
                   var html = "";
                   $.map(res.data,function(val,i){
            		html+="<tr valid='val.id'><td>"+i+"</td><td>"+val.bookname+"</td><td>"+val.auter+"</td><td>"+val.decript+"</td><td><button onclick='user.edit(this)' valid='"+val.id+"' type='button' class='btn btn-primary'>编辑</button><button valid='"+val.id+"' onclick='user.delete(this)' type='button' class='btn btn-danger' style='margin-left: 10px;''>删除</button></td></tr>"
            	})
                  	$("#tbody").html(html)
      			}

      		}

      	})
      }



      return obj;
}()