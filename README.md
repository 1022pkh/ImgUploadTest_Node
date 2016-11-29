# ImgUploadTest 프로젝트와 연결된 Node.js 서버 부분의 코드


기존의 경우에는 formidable 모듈을 사용하여 파일업로드 부분을 구현하였다.
하지만, multer 모듈이 더 간단하고 좋아 아래의 코드로 대체할 예정

app.post('/posts', upload.single('image'), function (req, res, next) {

    console.log("Request Get img upload");
    
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(
        { result : "success" }
    ));

})
