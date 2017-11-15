function myfunction(){
    alert("correct")
}
function hidediv(){
    var x=document.getElementById("centercontent_left");
    x.style.display="none";
    var y=document.getElementById("centercontent_left_hide");
    y.style.display="block";
}
function popup(){
    $("#fade").show();
    $("#light").show();
}

function getdetail(elem){
    $.ajax({
        type: "POST",     //提交方式
        dataType: "json",     //传回类型
        url: 'backend/test.php',
        data: {
            request_id:elem.id,
        },
        success: function (data) {
            //   alert(data.status);        //用data.d来获取后台传过来的json语句，或者是单纯的语句
            if(!data.status){
                popup();
                $("#detail").replaceWith('<span id="detail">compaign detail.</span>');
                $.each(data,function (detail_type,detail_content) {
                    $("#detail").append("<br>");
                    $("#detail").append('<input id="'+detail_type+'" disable>'+detail_type+":"+detail_content+'</input>');
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
            popup();
            //for test function, delete later
            var obj = JSON.parse('{ "cn":"1000", "cd":"tom", "am":"edfdg","cmc":"camp_4"}');
            $("#detail").replaceWith('<span id="detail">compaign detail.</span>');
            $('#changebtn').replaceWith('<span id="changebtn"><button id="edit"  class="adbtn" onclick="changebtn()">edit</button></span>');
            $.each(obj,function (detail_type,detail_content) {
//                $("#tb2").append('<tr><th aligh="left"><input  value="'+detail_type+'"disabled> </input></th><th aligh="right"><input id="'+detail_type+'"value="'+detail_content+'" class="inputDisabled" disabled> </input></th>>');
            $("input[name='"+ detail_type +"']").val(detail_content);

            });
            //
        },
        timeout:3000
    });
}

function showcamp(){
    console.log("after ajax");
///* for local json test, delete later
    var obj = JSON.parse('{ "101":"camp_1", "106":"camp_2", "270":"camp_3","350":"camp_4"}');
    $("#tb1").replaceWith('<table id="tb1"></table>');
    var i=0;
    $.each(obj,function (camp_id,camp_name) {
        i++;
        $("#tb1").append('<tr><th align="right">'+i+'</th><th><button id="'+camp_id+'"class="adbtn" onclick="getdetail(this)">'+camp_name+'</button></th><th align="right"><button id="'+camp_id+'"class="delbtn" onclick="deletecamp(this)">delete</button></th></tr>');

    });
//*/
    $('.centercontent_layout0').css('display','none');
    $('.centercontent_layout1').css('display','block');
    $('.centercontent_layout2').css('display','none');

}

function insertcampaign(){
    $('#lt1_left').css('display','none');
    $('#lt1_right').css('display','none');
    $('#lt1_left_hide').css('display','block');
    $('#lt1_right_hide').css('display','block');
}
function insertcamp() {
    var name = $("input[name='campaign_name']").val();
    var client = $("input[name='client_id']").val();
    var am = $("input[name='am_id']").val();
//    var st = $("input[name='status']").val();
    var sd = $("input[name='start_date']").val();
    var ed = $("input[name='end_date']").val();
//    var cp = $("input[name='contact_person']").val();
//    var staff = $("input[name='staff']").val();
//    var cmc = $("input[name='cm_cost']").val();
//    var ssapc = $("input[name='ssap_cost']").val();
    if(name.length < 1 || am.length < 1) {
        alert("Please enter Client Name and Address.");
    } else {
        $.ajax({
            type: "POST",     //提交方式
            //contentType: "application/json; charset=utf-8",   //内容类型
            dataType: "json",     //传回类型
            url: 'backend/test.php',
            data: {
                campaign: name,
                client: client, //id
                manager: am,
                sdate: sd,
                edate: ed,
                contact: name, //id
            },
            success: function (data) {
             //   alert(data.status);        //用data.d来获取后台传过来的json语句，或者是单纯的语句
                if(!data.status){
                    alert("save success");
                    layout1();
                }
                else alert("server error");
            },
            error: function (err) {
                alert("err:" + err);
                layout1();
    /* for temporary save on frontend
                var x=document.createElement("button");
                x.setAttribute("type","button");
                x.setAttribute("class","jqbtn");
                x.setAttribute("id","insertbtn");
                x.innerHTML =$("input[name='client_name']").val();
              $("#insert").append("<br>");
              $("#insert").append(x);
              $("#insertbtn").click(function(){
                  $("#fade").show();
                  $("#light").show();
              });
        //      $("#insert").append("<li>"+$("input[name='client_name']").val()+"</li>");
    */
           }
        });
    }
}

function deletecamp(elem){
    alert("I'll delete"+elem.id);   //pass id while click, delete it later
    $.ajax({
        type: "POST",     //提交方式
        //contentType: "application/json; charset=utf-8",   //内容类型
        dataType: "json",     //传回类型
        url: 'backend/test.php',
        data: {
            delete_id:elem.id,
        },
        success: function (data) {
            //   alert(data.status);        //用data.d来获取后台传过来的json语句，或者是单纯的语句
            if(!data.status){
                alert("delete success");
                layout1();
            }
            else alert("server error");
        },
        error: function (err) {
            alert("err:" + err);
            layout1();

        }
    });
}

function changebtn(){
        $('.inputDisabled').prop("disabled", false); // Element(s) are now enabled.
        $('#edit').replaceWith('<span id="changebtn"><button id="submit_edit"  class="adbtn">submit</button><span>');
    $.ajax({
        type: "POST",     //提交方式
        //contentType: "application/json; charset=utf-8",   //内容类型
        dataType: "json",     //传回类型
        url: 'backend/test.php',
        data: {
        },
        success: function (data) {
            //   alert(data.status);        //用data.d来获取后台传过来的json语句，或者是单纯的语句
            if (!data.status) {
                alert("save success");
                $("input[name='staf']").replaceWith('<select> <option>Option</option> <option>Option1</option><option>Option2</option></select>');
            }
            else alert("server error");
        },
        error: function (err) {
            alert("err:" + err);
            var obj = JSON.parse('{ "101":"camp_1", "106":"camp_2", "270":"camp_3","350":"camp_4"}');
            $("input[name='staf']").replaceWith('<select id="select"> <option>Option</option></select>');
            $.each(obj,function (staff_id,staff) {
                $('#select').append('<option id="'+staff_id+'">'+staff+'</option>');
            })
        }
    });
   //     $("input[name='staf']").replaceWith('<select> <option>Option</option> <option>Option1</option><option>Option2</option></select>');
        $('#submit_edit').click(function () {
            var name = $("input[name='cn']").val();
            var client = $("input[name='cd']").val();
            var am = $("input[name='am']").val();
            var st = $("input[name='st']").val();
            var sd = $("input[name='sd']").val();
            var ed = $("input[name='ed']").val();
            var cp = $("input[name='cp']").val();
            var staff = $("input[name='staf']").val();
            var cmc = $("input[name='cmc']").val();
            var ssapc = $("input[name='ssapc']").val();
            if(name.length < 1 || am.length < 1) {
                alert("Please enter Client Name and Address.");
            } else {
                $.ajax({
                    type: "POST",     //提交方式
                    //contentType: "application/json; charset=utf-8",   //内容类型
                    dataType: "json",     //传回类型
                    url: 'backend/test.php',
                    data: {
                        campaign: name,
                        client: client, //id
                        manager: am,
                        status: st,
                        sdate: sd,
                        edate: ed,
                        contact: cp, //id
                        staff: staff,
                        cmc: cmc,
                        ssapc: ssapc,
                    },
                    success: function (data) {
                        //   alert(data.status);        //用data.d来获取后台传过来的json语句，或者是单纯的语句
                        if (!data.status) {
                            alert("save success");
                            layout1();
                        }
                        else alert("server error");
                    },
                    error: function (err) {
                        alert("err:" + err);
                    //    alert(name+client+am+st);
                        layout1();

                    }
                });
            }
        })

}
