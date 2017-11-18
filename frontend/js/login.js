function confirm(){
    var user=$('#user').val()//获取页面中登录名和密码
    var pwd=$('#password').val();
    var hash_pas = hex_md5(pwd);
    if(user==""|| hash_pas==""){                          //判断两个均不为空（其他判断规则在其输入时已经判断）
        alert(" You should enter your name or password!")
        return false;
    }else{                                       //以上均符合要求，则调用登录esb接口
        $.post('backend/login/login', {
            //url:'backend/login/login',
            //type:'post',
            //datatype:"json",
                username:user,
                password:hash_pas,        //向服务器（接口）传递的参数
            }, function(data) {                                        //服务器（接口）返回来的数据
                console.log(data);
                if(data.status == 0) {/*
                    $.cookie('id', data.message.id);
                    $.cookie('firstname', data.message.firstname);
                    $.cookie('lastname', data.message.lastname);
                    $.cookie('email', data.message.email);
                    $.cookie('auth', data.message.auth);
                    data.message.cookie.forEach(function (item, index) {
                        $.cookie(item.key, item.value);
                    });*/
                    window.location.href = 'home';
                } else {
                    alert(" error username or password");
                }
        }, 'json');
    }
}
function setcookie(name,value,hours,path) {
    var username = escape(name);
    var value = escape(value);
    var expires = new Date();
    expires.setTime(expires.getTime()+days*3600000*24);
    path = path == "" ? "" : ";path=" + path;
    var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();
    document.cookie = name + "=" + value + _expires + path;

}

function getCookie(name) {
    var name = escape(name);
    var allcookies = document.cookie;
    name += "=";
    var pos = allcookies.indexOf(name);
    if (pos != -1){                        //如果pos值为-1则说明搜索"version="失败  
        var start = pos + name.length;                  //cookie值开始的位置  
        var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置  
        if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie  
        var value = allcookies.substring(start,end);        //提取cookie的值  
        return (value);                           //对它解码        
    }else{                                                 //搜索失败，返回空字符串  
        return "";

    }
}
