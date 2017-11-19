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
    $("#tb1").find('tbody').html("");
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
                //   $("#tb1").replaceWith('<table id="tb1"></table>');
                $.each(data, function (key,value) {
                    $("#tb1").find("tbody").append('<tr id="ca'+value.camp_id+'"><td align="middle">'+key+'</td><td align="middle"><button id="'+value.camp_id+'" class="button button-glow button-border button-rounded button-primary" onclick="getdetail(this)">'+value.camp_name+'</button></td><td align="middle"><button id="a'+value.camp_id+'"class="button button-circle button-tiny" onclick="getads(this)"></button></td><td align="middle"><button id="'+value.camp_id+'"class="button button-circle button-tiny" onclick="deletecamp(this)">-</button></td></tr>');
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
    $("#team").html("");
    $.ajax({
        type: "POST",
        dataType: "json",
        url:'backend/team/getteam',
        data: {


        },
        success: function (data) {
            if(!data.status){
                $.each(data,function (key,value) {
                    $("#team").append('<div id="teamdiv"><h2>'+"team"+value.teamid+"&nbsp"+value.cpname+'</h2><table id="teamtable"><tbody><tr><th>name</th><th>type</th><th>work hours</th></tr>')
                    $.each(value.staff,function (ke,val) {
                        $("#team").append('<tr><td align="center">'+val.staffname+'</td> <td align="center">'+val.stafftype+'</td><td align="center">'+val.hours+'</td></tr>')
                    });
                    $("#team").append('</tbody></table>');
                    $("#teamtable").easyTable({
                        hover:'btn-primary',
                        buttons:false,
                        select:true,
                        sortable:false,
                        scroll: {active: true, height: '400px'}
                    })
                    $("#team").append('</div>');


                });
                console.log("after ajax")
                $('.centercontent_layout0').css('display','none');
                $('.centercontent_layout1').css('display','none');
                $('.centercontent_layout2').css('display','block');


                }
                else (alert("server error"));
            }

        });

        }




