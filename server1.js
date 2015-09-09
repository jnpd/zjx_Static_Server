/**
 * Created by Administrator on 2015/9/9.
 */
var http = require('http');
var fs= require('fs');
var path = require('path');
var mime = require('mime');
//makeP('test3/test4/test5')
function makeP(path){
    var paths = path.split('/');

    for(var i =1;i<=paths.length;i++){
        var p = paths.slice(0,i).join('/');
        var exists = fs.existsSync(p);
        if(exists){
            continue;
        }else{
            fs.mkdirSync(p);
            console.log(p+'目录创建成功');
        }
    }
}

function deteleP(path){
    var paths = path.split('/');
    console.log('detele file')
    console.log(path)
    for(var i = paths.length; i >= 1; i--){
        var p = paths.slice(0, i).join('/');
        console.log(p);
        if(fs.existsSync(path)){
            if(fs.statSync(p).isDirectory()){
                var fileList = fs.readdirSync(p);
                fileList.forEach(function(files){
                    var curpath =p+'/'+files;
                    if(fs.statSync(curpath).isDirectory()){
                        deteleP(curpath)
                    }else{
                        fs.unlinkSync(curpath);
                    }
                });
                fs.rmdirSync(path);
            }else{
                fs.unlinkSync(path)
            }
        }
    }

}


http.createServer(function(req,res){
    var url = req.url;
    var urls = url.split('?');
    var pathname = urls[0];
    var query = urls[1];
    var queryObj={};
    if(query){
        //console.log(query);
        var fields = query.split('&');
        fields.forEach(function(fields){
            var vals = fields.split('=');
            queryObj[vals[0]]=vals[1]
        })
    }



    if(pathname=='./favivon.ico'){
         res.end('忽略不计');
    }else if(pathname=='/del'){
         for(var key in queryObj){
             console.log(queryObj[key])
              deteleP(queryObj[key]);

         }

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
                                if(file=='.git'||file=='.idea'||file=='server.js'){

                                }else{
                                    var filePath = filename+'/'+file;
                                    if(pathname=='/'){
                                        if(fs.statSync(filePath).isDirectory()){
                                            htmlStr+='<li class="folder" ><a href="'+file+'"> 点击查看文件夹 '+file+'</a><a href="/del?path='+file+'" class="del">删除</a></li>';
                                        }else{
                                            htmlStr+='<li><a href="'+file+'"> 点击查看文件 '+file+'</a><a href="/del?path='+file+'" class="del" >删除</a></li>';
                                        }
                                    }else{
                                       // console.log(pathname)
                                        if(fs.statSync(filePath).isDirectory()){
                                            htmlStr+='<li class="folder" ><a href="'+pathname+'/'+file+'">点击查看文件夹 '+file+'</a><a href="/del?path='+file+'" class="del">删除</a></li>';
                                        }else{
                                            htmlStr+='<li><a href="'+pathname+'/'+file+'">点击查看文件 '+file+'</a><a href="/del?path='+file+'" class="del">删除</a></li>';
                                        }

                                    }
                                    //console.log(file);
                                }

                            })
                        }
                        htmlStr+="</ul>"
                        res.end(htmlStr);
                    })

                }else if(fs.statSync(filename).isFile()){// 判断如果是文件
                    res.writeHeader(200,(mime.lookup(filename))+';charset=utf-8');
                    fs.readFile(filename,function(err,data){
                            res.end(data);

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