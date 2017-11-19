function confirm(){
    var user=$('#user').val()//获取页面中登录名和密码
    var pwd=$('#password').val();
    var hash_pas = hex_md5(pwd);
    if(user==""|| hash_pas==""){                          //判断两个均不为空（其他判断规则在其输入时已经判断）
        alert(" You should enter your name or password!")
        return false;
    }else{                                       //以上均符合要求，则调用登录esb接口
        $.post('backend/login/login', {
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
