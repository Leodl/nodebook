/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-02-07 14:25:13
 * @version $Id$
 */

var user = function(){
      var obj = {};
      obj.qiniuurl = 'http://os70jnmwy.bkt.clouddn.com/'
      obj.submit = function(event){
          var username = $("#username").val();
          var password = $("#password").val();
          console.log(username)
            if($.trim(username)==""||$.trim(password)==""){
            swal("用戶名密碼不能為空","You clicked the button!","warning");
            return;
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
                console.log(obj.qiniuurl+''+val.bookpic+'')
            		html+="<tr valid='"+val.id+"'><td>"+i+"</td><td>"+val.bookname+"</td><td><img src='"+obj.qiniuurl+""+val.bookpic+"'/></td><td>"+val.auter+"</td><td>"+val.decript+"</td><td><button onclick='user.edit(this)' valid='"+val.id+"' type='button' class='btn btn-primary' data-toggle='modal' data-target='#edi_exampleModal' >编辑</button><button valid='"+val.id+"' onclick='user.delete(this)' type='button' class='btn btn-danger' style='margin-left: 10px;''>删除</button></td></tr>"
            	})

            	$("#tbody").html(html)
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
         //$(dom).parent().parent().find("td:eq(1)").attr("")
         var id = $(dom).parent().parent().attr("valid")
         var bookname = $(dom).parent().parent().find("td:eq(1)").text();
         var bookpic = $(dom).parent().parent().find("td:eq(2)").find('img').attr("src").split('/')[3]=="null"?"null":$(dom).parent().parent().find("td:eq(2)").find('img').attr("src")
         console.log(bookpic)
         var auter = $(dom).parent().parent().find("td:eq(3)").text();
         var decript = $(dom).parent().parent().find("td:eq(4)").text();
         $("#edi_bookname").val(bookname);
         $("#edi_bookname").attr("bookid",id)
         $("#edi_autername").val(auter);
         $("#edi_bookdec").text(decript)
        // if (bookpic!=="null") {
          $('#pictureFile').fileinput('refresh', {
            fileActionSettings: {
              showUpload: false,
              showRemove: false,
              showZoom: false
            },
            initialPreviewAsData: true,
            initialPreview: [
                  bookpic
            ],
          });
       // }
      }
      


      obj.update = function(dom){
   
       var id = $("#edi_bookname").attr("bookid");
       var bookname = $("#edi_bookname").val();
       var auter =  $("#edi_autername").val();
       var decript = $("#edi_bookdec").text()

      	var data = {
        	id:id,
        	bookname:bookname,
        	auter:auter,
        	decript:decript
        }
        data.bookpic = obj.bookpic
        console.log(data)

        var datas = JSON.stringify(data)
      	$.ajax({
      		url:'/book/update',
      		type:'put',
      		dataType : 'json',
      		data:datas,
      		success:function(res){
              if(res.result==0){
                 swal(res.message,"You clicked the button!","success");
                  $('#edi_exampleModal').modal('hide');
                   obj.booklist();
              }
      		}
      	})

      }

         obj.initupdate = function(){

           obj.bookpic = "";

           $("#pictureFile").qiniu({
            showCaption: false,
            maxFileCount: 45,
            browseClass: '',
            browseLabel: '<div class="z_file"></div>'
        }).on('fileuploaded', function (event, data, msg) {
            var key = data.response.key;
            console.log(key)
            obj.bookpic = key;
        }).on('filebatchuploadcomplete', function (event, files, extra) {
            obj.update();
        });


         $(".updatesure").click(function(form){

             var count = $('#pictureFile').fileinput('getFilesCount');
                if (count > 0) {
                    $('#pictureFile').fileinput('upload');
                } else {
                    obj.update();
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
            		html+="<tr valid='"+val.id+"'><td>"+i+"</td><td>"+val.bookname+"</td><td><img src='"+obj.qiniuurl+""+val.bookpic+"'/></td><td>"+val.auter+"</td><td>"+val.decript+"</td><td><button onclick='user.edit(this)' valid='"+val.id+"' type='button' class='btn btn-primary' data-toggle='modal' data-target='#edi_exampleModal' >编辑</button><button valid='"+val.id+"' onclick='user.delete(this)' type='button' class='btn btn-danger' style='margin-left: 10px;''>删除</button></td></tr>"
            	})
                  	$("#tbody").html(html)
      			}

      		}

      	})
      }


      obj.initaddbook = function(){

           obj.bookpic = "";

           $("#imgFile").qiniu({
            showCaption: false,
            maxFileCount: 45,
            browseClass: '',
            browseLabel: '<div class="z_file"></div>'
        }).on('fileuploaded', function (event, data, msg) {
            var key = data.response.key;
            console.log(key)
            obj.bookpic = key;
        }).on('filebatchuploadcomplete', function (event, files, extra) {
            obj.addbook();
        });


         $(".sure").click(function(form){

             var count = $('#imgFile').fileinput('getFilesCount');
                if (count > 0) {
                    $('#imgFile').fileinput('upload');
                } else {
                    obj.addbook();
                }

        })

     

      }

       obj.addbook = function(){

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
           data.bookpic=obj.bookpic;
          var datas = JSON.stringify(data);
          console.log(datas)
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



      return obj;
}()