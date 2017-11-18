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
    $("#tb1").html("");
    $.ajax({
        type: "POST",     //提交方式
        dataType: "json",     //传回类型
        url: 'backend/campaign/getcampaign',
        data: {
            //request_type: "1",
            //user_role: "1",

            //user_id: address,
        },
        success: function (data) {
            //   alert(data.status);        //用data.d来获取后台传过来的json语句，或者是单纯的语句
            if(!data.status){
                $("#tb1").replaceWith('<table id="tb1"></table>');
                var i=0;
                $.each(data, function (key,value) {
                    $("#tb1").append('<tr id="ca'+value.camp_id+'"><th align="left">'+(key+1)+'</th><th><button id="'+value.camp_id+'"class="adbtn" onclick="getdetail(this)">'+value.camp_name+'</button></th><th><button id="a'+value.camp_id+'"class="button button-circle button-tiny" onclick="getads(this)"></button></th><th align="right"><button id="'+value.camp_id+'"class="button button-circle button-tiny" onclick="deletecamp(this)">-</button></th></tr>');

                });
                showcamp();
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
    console.log("begin ajax");
    $("#team").html(null);
    $.ajax({
        type: "POST",
        dataType: "json",
        url:'backend/js',
        data: {

        },
        success: function (data) {
            if(!data.status){
                var i=0;
                var j=0;
                $.each(data,function (key,value) {
                    $("#team").append('<table><tr><th align="center">'+value.teamid+'</th><th align="center">'+value.cpname+'</th></tr>')
                    $.each(value,function (ke,val) {
                        $("#team").append('<tr><td align="left">'+val.staffname+'</td> <td align="center">'+val.stafftype+'</td><td align="right">'+val.hours+'</td></tr>')
                    });
                    $("#team").append('</table>')
                });


                }
            }

        });

        }


    $('.centercontent_layout0').css('display','none');
    $('.centercontent_layout1').css('display','none');
    $('.centercontent_layout2').css('display','block');
}
