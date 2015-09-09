/**
 * Created by Administrator on 2015/9/9.
 */
var http = require('http');
var fs= require('fs');
var path = require('path');
var mime = require('mime');

http.createServer(function(req,res){
    var pathname = req.url;

    if(pathname=='./favivon.ico'){
         res.end('忽略不计');
    }else{
        var filename = '.'+pathname;
        fs.exists(filename,function(exists){// 判断文件是否存在
            if(exists){//如果文件存在
                var htmlStr = '<link href="css/index.css" rel="stylesheet">';
                htmlStr+="<h2>This is a file server</h2>";
                htmlStr+='<ul>';
                if(fs.statSync(filename).isDirectory()){//判断是否是目录
                    fs.readdir(filename,function(err,files){
                        res.writeHeader(200,{'Content-Type':'text/html;charset=utf-8'});
                        if(err){
                            console.log('error')
                        }else{
                            files.forEach(function(file){
                                var filePath = filename+'/'+file;
                                if(pathname=='/'){
                                     if(fs.statSync(filePath).isDirectory()){
                                         htmlStr+='<li><a href="'+filePath+'" class="folder" > '+file+'</a></li>';
                                     }else{
                                         htmlStr+='<li><a href="'+filePath+'" > '+file+'</a></li>';
                                     }
                                }else{

                                }
                                console.log(file)

                            })
                        }
                        res.end(htmlStr);
                    })

                }else if(fs.statSync(filename).isFile()){// 判断如果是文件
                    res.writeHeader(200,mime.lookup(path.basename(filename))+';charset=utf-8');
                    fs.readFile(filename,function(err,data){
                        if(err){
                            res.end(err)
                        }else{
                            res.end(data);
                        }
                    })
                }else{
                    res.writeHeader(404,{'Content-Type':'text/html;charset=utf-8'});
                    res.write('This not found file');
                    res.end()
                }
            }

        })
    }
   // console.log(filename);
    //res.end('i am a test')

}).listen(0909)