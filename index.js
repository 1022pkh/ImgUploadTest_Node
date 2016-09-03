var express	=	require("express");
var formidable = require('formidable');
var fs = require('fs-extra'); // 파일을 복사하거나 디렉토리를 복사하는 모듈

//서버 생성
var app	=	express();


app.get('/',function(req,res){
      res.send("Hello!");
});


/*
처음에는 multer 모듈을 사용하여 시도했지만, 웹페이지 내에서 파일업로드는 잘 작동하였지만 안드로이드앱,postman을 통해 시도할 때 안되었음
그래서 안드로이드 앱 - node.js 서버로 파일 업로드를 구현했던 경험자에게 조언을 구했음.
그 결과 자신도 multer모듈로 했을 때 안되어서 formidable 모듈을 사용했다고 함. 
multer 모듈은 웹페이지내에 적합한 모듈이라고 함

*/
app.post('/upload',function(req,res){ 

    console.log("Request upload!");

    var name = "";
    var filePath = "";
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        name = fields.name;
    });

    form.on('end', function(fields, files) {
      for (var i = 0; i < this.openedFiles.length; i++) {
        var temp_path = this.openedFiles[i].path;
        var file_name = this.openedFiles[i].name;
        var index = file_name.indexOf('/'); 
        var new_file_name = file_name.substring(index + 1);
         
        var new_location = 'uploads/'+name+'/';

        fs.copy(temp_path, new_location + file_name, function(err) { // 이미지 파일 저장하는 부분임
          if (err) {
            console.error(err);

            console.log("upload error!");
          }
          else{      
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ result : "success", url : new_location+file_name }, null, 3));

            console.log("upload success!");
          }
        });
      }

    });
    
});




//연결 테스트
app.get('/connect',function(req,res){
      // res.end("GET TEST Success!");
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ result : "success" }, null, 3));
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});