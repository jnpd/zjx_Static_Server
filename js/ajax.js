/**
 * Created by lenovo on 2015/9/9.
 */

var oA = document.querySelectorAll('.del');
for(var i=0;i<oA.length;i++){
    oA[i].onclick = fn;
}

function fn(){
    var paths = (this.href).split('?');
    //console.log(paths[1]);
    var xhr = new XMLHttpRequest();
    xhr.open("get", '/del?'+paths[1]);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if(xhr.responseText){
                window.location.reload()
            }else{
                console.log('Ê§°Ü')
            }
        }
    };
    xhr.send();
    return false;
}