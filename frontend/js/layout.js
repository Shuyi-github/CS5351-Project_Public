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
    $('.inputDisabled').prop("disabled", true);
    $('.staffinfo').replaceWith("");
    $('#select2').replaceWith('<input type="text" name="staf" class="inputDisabled" disabled> </input></th>');
    $('#addstaff').css("display","none");
    $('.selectaddstaff').replaceWith("");


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
                if(CONFIG.role==2){
                    $('#idea_del').replaceWith('<th align="middle" style="font-size: 20px" id="idea_del">idea</th>');
                    $.each(data,function (key,value) {
                        $("#tb1").find("tbody").append('<tr id="ca'+value.camp_id+'"><td align="middle">'+(key+1)+'</td><td align="middle"><button id="'+value.camp_id+'" class="button button-glow button-border button-rounded button-primary button-inverse" onclick="getdetail(this)">'+value.camp_name+'</button></td><td align="middle"><button id="a'+value.camp_id+'"class="button button-circle button-tiny button-royal" onclick="getads(this)"></button></td><td align="middle"><button id="idea'+value.camp_id+'"class="button  button-pill button-glow button-rounded button-raised button-primary" onclick="addIdeaTocamp(this)">idea</button></td></tr>');
                    });
                }
                else if(CONFIG.role==1){
                    $.each(data, function (key, value) {
                        $("#tb1").find("tbody").append('<tr id="ca' + value.camp_id + '"><td align="middle">' + (key + 1) + '</td><td align="middle"><button id="' + value.camp_id + '" class="button button-glow button-border button-rounded button-primary button-inverse" onclick="getdetail(this)">' + value.camp_name + '</button></td><td align="middle"><button id="a' + value.camp_id + '"class="button button-circle button-tiny" onclick="getads(this)"></button></td><td align="middle"><button id="' + value.camp_id + '"class="button button-caution button-pill button-tiny" onclick="deletecamp(this)">-</button></td></tr>');
                    });
                }
                else if(CONFIG.role==0){
                    $('#idea_del').replaceWith('<th align="middle" style="font-size: 20px" id="idea_del">client</th>');
                    $.each(data, function (key, value) {
                        $("#tb1").find("tbody").append('<tr id="ca' + value.camp_id + '"><td align="middle">' + (key + 1) + '</td><td align="middle"><button id="' + value.camp_id + '" class="button button-glow button-border button-rounded button-primary button-inverse" onclick="getdetail(this)">' + value.camp_name + '</button></td><td align="middle"><button id="a' + value.camp_id + '"class="button button-circle button-tiny" onclick="getads(this)"></button></td><td align="middle">'+value.client+'</td></tr>');
                    })
                }
                else{
                    $('#idea_del').replaceWith('<th align="middle" style="font-size: 20px" id="idea_del">idea</th>');
                    $.each(data, function (key, value) {
                        $("#tb1").find("tbody").append('<tr id="ca' + value.camp_id + '"><td align="middle">' + (key + 1) + '</td><td align="middle"><button id="' + value.camp_id + '" class="button button-glow button-border button-rounded button-primary button-inverse" onclick="getdetail(this)">' + value.camp_name + '</button></td><td align="middle"><button id="a' + value.camp_id + '"class="button button-circle button-tiny" onclick="getads(this)"></button></td><td align="middle"><button id="idea'+value.camp_id+'"class="button  button-pill button-glow button-rounded button-raised button-primary" onclick="addIdeaTocamp(this)">idea</button></td></tr>');
                    })
                }
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
            $('#idea_del').replaceWith('<th align="middle" style="font-size: 20px" id="idea_del">idea</th>');
            var data = JSON.parse('{ "1":"1000", "2":"tom", "3":"edfdg","4":"camp_4"}');
            if(CONFIG.role==2){
                $('#idea_del').replaceWith('<th align="middle" style="font-size: 20px" id="idea_del">idea</th>');
                $.each(data,function (key,value) {
                    $("#tb1").find("tbody").append('<tr id="ca'+value.camp_id+'"><td align="middle">'+(key+1)+'</td><td align="middle"><button id="'+value.camp_id+'" class="button button-glow button-border button-rounded button-primary" onclick="getdetail(this)">'+value.camp_name+'</button></td><td align="middle"><button id="a'+value.camp_id+'"class="button button-circle button-tiny button-royal" onclick="getads(this)"></button></td><td align="middle"><button id="idea'+value.camp_id+'"class="button  button-pill button-glow button-rounded button-raised button-primary" onclick="addIdeaTocamp(this)">idea</button></td></tr>');
                });
            }
        else if(CONFIG.role==1){
                $.each(data, function (key, value) {
                    $("#tb1").find("tbody").append('<tr id="ca' + value.camp_id + '"><td align="middle">' + (key + 1) + '</td><td align="middle"><button id="' + value.camp_id + '" class="button button-glow button-border button-rounded button-primary" onclick="getdetail(this)">' + value.camp_name + '</button></td><td align="middle"><button id="a' + value.camp_id + '"class="button button-circle button-tiny" onclick="getads(this)"></button></td><td align="middle"><button id="' + value.camp_id + '"class="button button-caution button-pill button-tiny" onclick="deletecamp(this)">-</button></td></tr>');
                });
            }
            else{
                $('#idea_del').replaceWith('<th align="middle" style="font-size: 20px" id="idea_del"></th>');
                $.each(data, function (key, value) {
                    $("#tb1").find("tbody").append('<tr id="ca' + value.camp_id + '"><td align="middle">' + (key + 1) + '</td><td align="middle"><button id="' + value.camp_id + '" class="button button-glow button-border button-rounded button-primary button-inverse" onclick="getdetail(this)">' + value.camp_name + '</button></td><td align="middle"><button id="a' + value.camp_id + '"class="button button-circle button-tiny" onclick="getads(this)"></button></td><td></td></tr>');
                })
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
                    $("#team").append('<div id="teamdiv"><pre style="font-size: larger">'+"TEAM"+value.teamid+"           "+value.cpname+'</pre><table id="teamtable" align="center" width="1200"><tr><th>name</th><th>type</th><th>work hours</th></tr>')
                    $.each(value.staff,function (ke,val) {
                        $("#team").append('<table id="teamtable" align="center" width="1200"><tr><td align="center">'+val.staffname+'</td> <td align="center">'+val.stafftype+'</td><td align="center">'+val.hours+'</td></tr></table>')
                    });
                    //$("#team").append('</table>');
                    $("#team").append('<div><br></div>');
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


function logout() {
    console.log("begin ajax");
    $.ajax({
        type: "POST",
        dataType: "json",
        url:'backend/login/logout',
        success: function (data) {
            console.log(data);
            window.location.href='index';
            $('.centercontent_layout0').css('display','block');
            $('.centercontent_layout1').css('display','none');
            $('.centercontent_layout2').css('display','none');


        },


    })

}

function submitidea() {
    console.log("begin ajax")
 //   ideacamp = $(this).attr('id');
//    var ideacp = ideacamp.replace('idea','');
    var idea = $('#hehe').parent().find('textarea[name="Text1"]').val();
    if(idea.length==null)
        alert("Please write your idea")
    else {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: 'backend/campaign/addnote',
            data: {
                campaign_id: ideacamp,
                note : idea,
            },
            success:function (data) {
                alert("submit success");
                $('#hehe').parent().find('textarea[name="Text1"]').val('');
                $("#hehe").html('');
                console.log("after ajax");
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url:'backend/campaign/getnote',
                    data: {
                        campaign_id : ideacamp,

                    },
                    success :function(data) {
                        $.each(data,function(key,value){
                            $("#hehe").append('<pre style="text-align: center">'+"Author:"+" "+value.name+'</pre><div style="word-wrap:break-word; border: 2px solid #4cb0f9" >' + value.idea + '</div><br>');
                        });

                        popup();
                        $('#tb2').hide();
                        $('#tb4').css("display","block");
                        $('#div_btn').css('display','none');
                    },

                })

            }
        })
    }
}




