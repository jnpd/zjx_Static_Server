/**
 * Created by Administrator on 2015/9/9.
 */
var http = require('http');
var fs= require('fs');
var path = require('path');
var mime = require('mime');

http.createServer(function(req,res){
    var pathname =req.url;
    var filename = '.'+pathname;
    fs.exists(filename,function(exists){//判断文件是否存在

        if(exists){ //文件存在
            console.log(filename)
            var str = '<link rel="stylesheet" href="/css/index.css">'
            str+='<h1>This is a static file servers</h1>';
            str+='<ul>';
            if(fs.statSync(filename).isDirectory()){//判断是否是目录
                console.log(filename)

                fs.readdir(filename,function(err,files){
                    res.writeHeader(200,{'Content-Type':'text/html;charset=utf-8'});
                    if(err){
                        console.log('error')
                    }else{
                        files.forEach(function(file){
                              //console.log(file)
                              str += '<li >' + file + '</a></li>';
                        })
                    }
                    res.end(str);

                })

            }else if(fs.statSync(filename).isFile()){
                res.writeHeader(200,{'Content-Type':mime.lookup(path.basename(filename))+';charset=utf8'});
                fs.readFile(filename,function(err,data){
                     if(err){
                         res.end(err);
                     }else{
                         res.end(data);
                     }
                })
            }else{
                res.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
                res.write('<span>'+ pathname +'</span>');
                res.end();
            }

        }
    })

}).listen(0909)