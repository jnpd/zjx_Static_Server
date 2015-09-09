/**
 * Created by Administrator on 2015/9/9.
 */
var http = require('http');
var fs= require('fs');

http.createServer(function(req,res){
    var pathname =req.url;

    if(pathname=='/favivon.ico'){
        res.end('忽略不计');
    };
    var filename = '.'+pathname;
    fs.exists(filename,function(exists){//判断文件是否存在
        if(exists){ //文件存在
            if(fs.statSync(filename).isDirectory()){//判断是否是目录
                console.log(filename)
                var str = '<link rel="stylesheet" href="/css/index.css">';
                str+='<h1>This is a static file servers</h1>';
                str+='<ul>';
                fs.readdir(filename,function(err,file){
                    res.writeHeader(200,{'Content-Type':'text/html;charset=utf-8'});
                    if(err){
                        console.log('error')
                    }else{
                        console.log(file)
                    }

                })

            }
        }
    })
   res.end('hell world');
}).listen(0909)