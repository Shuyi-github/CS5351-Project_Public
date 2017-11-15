function layout0(){
    var currentdate =new Date();
    var datetime="Today:"+currentdate.getDate()+"/"
        + (currentdate.getMonth()+1)+"/"
        +currentdate.getFullYear()+"@"
        +currentdate.getHours()+":"
        +currentdate.getMinutes();
    $("#welcome").replaceWith("welcome back, "+datetime);
    $('.centercontent_layout0').css('display','block');
    $('.centercontent_layout1').css('display','none');
    $('.centercontent_layout2').css('display','none');
}
function layout1(){

    console.log("begin ajax");
    $.ajax({
        type: "POST",     //提交方式
        dataType: "json",     //传回类型
        url: 'backend/test.php',
        data: {
            request_type: "1",
            user_role: "1",
            //user_id: address,
        },
        success: function (data) {
            //   alert(data.status);        //用data.d来获取后台传过来的json语句，或者是单纯的语句
            if(!data.status){
                showcamp();
                $("#tb1").replaceWith('<table id="tb1"></table>');
                var i=0;
                $.each(data,function (camp_id,camp_name) {
                    i++;
                    $("#tb1").append('<tr><th align="right">'+i+'</th><th><button id="'+camp_id+'"class="adbtn" onclick="getdetail()">'+camp_name+'</button></th><th align="right"><button id="'+camp_id+'"class="adbtn" onclick="deletecamp()">delete</button></th></tr>');

                });
            }
            else alert("server error");
        },
        error: function (err,textStatus) {
            console.log("timeout");
            if(textStatus=='timeout')
            {
                alert('Failed from timeout');
            }
            else{
                alert("err:" + err);
            }
            showcamp();
        },
        timeout:3000
    });

}
function layout2(){
    $('.centercontent_layout0').css('display','none');
    $('.centercontent_layout1').css('display','none');
    $('.centercontent_layout2').css('display','block');
}
