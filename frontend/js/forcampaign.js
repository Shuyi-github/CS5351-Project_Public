function popup(){
    $("#fade").show();
    $("#light").show();
}

function getdetail(elem){
    $.ajax({
        type: "POST",     //提交方式
        dataType: "json",     //传回类型
        url: 'backend/campaign/getcampaignbyid',
        data: {
            request_id:elem.id,
        },
        success: function (data) {
            //   alert(data.status);        //用data.d来获取后台传过来的json语句，或者是单纯的语句
            if(!data.status){
                popup();
                $("#detail").replaceWith('<span id="detail">compaign detail.</span>');
                $('input[name=staf]').css("display","none");
                $('#changebtn').replaceWith('<span id="changebtn"><button id="edit"  class="button button-pill button-tiny button-primary" onclick="changebtn('+elem.id+')">edit</button></span>');
                $.each(data,function (key,value) {
                    if(key =="staff"){
                        $.each(value,function(ky,val){
                            $('<tr class="staffinfo"><th align="right"></th><th><input type="text" disabled value="'+val.name+'"> </input></th><th><input type="text" disabled value="'+val.hour+'" class="inputDisabled" disabled> </input></th></tr>').insertAfter($('#showstaff'));
                        });
                    }
                   else $("input[name='"+ key +"']").val(value);
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
            $('#changebtn').replaceWith('<span id="changebtn"><button id="edit"  class="button button-pill button-tiny button-primary" onclick="changebtn()">edit</button></span>');
            $.each(obj,function (detail_type,detail_content) {
               $("input[name='"+ detail_type +"']").val(detail_content);

            });
            //
        },
        timeout:3000
    });
}
function getads(elem){
    // alert("show me:"+elem.id);
    var fromcamp=elem.id.replace('a','');
    var id=elem.id;
    var camp="c"+elem.id;
    //  alert(trs);
    // $('#'+trs).append('<tr id="123"></tr>');
//    $('<tr class="trads"><th aligh="right"> ads type</th><th>idea</th><th aligh="right">cost type</th><th aligh="right">cost</th></tr>').insertAfter($('#'+trs).closest('tr'));

    $.ajax({
        type: "POST",     //提交方式
        dataType: "json",     //传回类型
        url: 'backend/ads/getadsbycampaign',
        data: {
            campaign_id: fromcamp,
        },
        success: function (data) {
            //   alert(data.status);        //用data.d来获取后台传过来的json语句，或者是单纯的语句
            if(!data.status){
                $.each(data,function (key,value) {
                    $('<tr id="'+elem.id+value.ID+'" class="trads"><td align="middle">'+value.Type+'</td><td align="middle"></td><td align="middle"><button class="jqbtn" onclick="adsdetail('+value.ID+')">'+value.ID+'</button></td><td align="middle">'+value.Cost+'</td></tr>').insertAfter($('#'+camp).closest('tr'));
                });
                $('#'+elem.id).replaceWith('<button class="button button-pill button-tiny" id="close'+id+'" ></button>');
                $('#close'+id).click(function () {
                    $('tr[id^="' + id + '"]').replaceWith("");
                    $('#close'+id).replaceWith('<button id="' + id + '"class="button button-circle button-tiny" onclick="getads(this)"></button>');
                });
            }
            else alert("server error");
        },
        error: function (err,textStatus) {

            var data = JSON.parse('{ "1":"1000", "2":"tom", "3":"edfdg","4":"camp_4"}');
            $.each(data,function (ads_id,ads_type) {
                $('<tr id="'+elem.id+ads_id+'" class="trads"><td align="middle">'+ads_type+'</td><td align="middle"><button class="jqbtn" onclick="adsdetail('+ads_id+')">'+ads_id+'</button></td><td align="middle">cost_type</td><td align="middle">cost</td></tr>').insertAfter($('#'+camp).closest('tr'));
            });
            $('#'+elem.id).replaceWith('<button class="button button-pill button-tiny" id="close'+id+'" ></button>');
            $('#close'+id).click(function () {
                $('tr[id^="' + id + '"]').replaceWith("");
                $('#close'+id).replaceWith('<button id="' + id + '"class="button button-circle button-tiny" onclick="getads(this)"></button>');
            });


        },
        timeout:3000
    });

    // closeads(id);
    //$("#closeads").click(closeads(id));

}
function adsdetail(ads){
    $('#tb2').hide();
    $('#tb3').show();
    $('#edit').hide();
    $('#changebtn').css('display','none');
    $('#edads').show();
    $('#tb3').css("display","block");
    //alert(ads);
    popup();
    $("input[name='cst_type']").prop("disabled", false);
    $("input[name='cst']").prop("disabled", false);
    var obj=JSON.parse('{ "1":"NEWSPAPER AD", "2":"ONLINE AD", "3":"TV COMMERCIAL"}');
    $("input[name='cst_type']").replaceWith('<select id="select3" class="selectads"> </select>');
    $.each (obj,function (i,k) {
        $('#select3').append('<option id="costtype'+i+'">' + k + '</option>');
    });
/*    $("#edit_ads").click(function(){
        $("#edads").replaceWith('<span id="edads"><button id="save_ads"  class="jqbtn">save</button></span>');
        $('.inputDisabled').prop("disabled", false);
        var cst_array=[1,2,3,4,5,6];
        $("input[name='cst_type']").replaceWith('<select id="select3"> </select>');
        $.each (cst_array,function (i,k) {
            $('#select3').append('<option>'+k+'</option>');
        })
    });
*/    //error
 $.ajax({
        type: "POST",     //提交方式
        dataType: "json",     //传回类型
        url: 'backend/ads/getadbyid',
        data: {
            ads_id: ads,
        },
        success: function (data) {
            //   alert(data.status);        //用data.d来获取后台传过来的json语句，或者是单纯的语句
            if(!data.status){
                $("input[name='cst']").val(data.cost);
            }
            else alert("server error");
        },
        error: function (err,textStatus) {


        },
        timeout:3000
    });

    $("#save_ads").on("click",function () {
        alert("save success");
        var costtype=$('#select3 option:selected').attr("id")
        costtype=costtype.replace('costtype','');
        money=$("input[name='cst']").val();
       // layout1();
       $.ajax({
        type: "POST",     //提交方式
        dataType: "json",     //传回类型
        url: 'backend/ads/updatead',
        data: {
            ads_id: ads,
            type:costtype,
            cost:money,
        },
        success: function (data) {
            //   alert(data.status);        //用data.d来获取后台传过来的json语句，或者是单纯的语句
            if(!data.status){
            }
            else alert("server error");
        },
        error: function (err,textStatus) {


        },
        timeout:3000
    });
    });

}


function showcamp(){
    console.log("after ajax");

    $('.centercontent_layout0').css('display','none');
    $('.centercontent_layout1').css('display','block');
    $('.centercontent_layout2').css('display','none');
    $('#tb3').hide();
    $('#tb2').show();
}

function to_newcam_lyt(){
    $('#lt1_left').css('display','none');
    $('#lt1_right').css('display','none');
    $('#lt1_left_hide').css('display','block');
    $('#lt1_right_hide').css('display','block');

    $.ajax({
        type: "POST",     //提交方式
        //contentType: "application/json; charset=utf-8",   //内容类型
        dataType: "json",     //传回类型
        url: 'backend/client/getallclient',
        data: {
        },
        success: function (data) {
            //   alert(data.status);        //用data.d来获取后台传过来的json语句，或者是单纯的语句
            if (!data.status) {
                //   alert("get staff success");
                $("input[name='cl_id']").replaceWith('<select id="select_client"></select>');
                $.each(data,function (key,value) {
                    $('#select_client').append('<option id="'+value.id+'">'+value.name+'</option>');
                })}
            else alert("server error");
        },
        error: function (err) {
            alert("err:" + err);
            var obj1 = JSON.parse('{ "101":"camp_1", "106":"camp_2", "270":"camp_3","350":"camp_4"}');
            $("input[name='cl_id']").replaceWith('<select id="select_client"></select>');
            //    $("input[name='st']").replaceWith('<select id="select3"></select>');
            $.each(obj1,function (id,name) {
                $('#select_client').append('<option id="'+id+'">'+name+'</option>');
            })

        }
    });
}
function insertcamp() {
    var name = $("input[name='c_name']").val();
    //var client = $("input[name='cl_id']").val();
    var client=$( "#select_client option:selected" ).attr("id");
    //   var am = $("input[name='am_id']").val();
//    var st = $("input[name='status']").val();
    var sd = $("input[name='start_date']").val();
    var ed = $("input[name='end_date']").val();
//    var cp = $("input[name='contact_person']").val();
//    var staff = $("input[name='staff']").val();
//    var cmc = $("input[name='cm_cost']").val();
//    var ssapc = $("input[name='ssap_cost']").val();
    if( name.length < 1 || client.length < 1) {
        alert("Please enter campaign Name and client name.");
    } else {
        $.ajax({
            type: "POST",     //提交方式
            //contentType: "application/json; charset=utf-8",   //内容类型
            dataType: "json",     //传回类型
            url: 'backend/campaign/addcampaign',
            data: {
                campaign: name,
                client: client, //id
                //manager: am,
                sdate: sd,
                edate: ed,
                //contact: name, //id
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
        url: 'backend/campaign/deletecampaign',
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
function addIdeaTocamp(elem){
    console.log("begin ajax");
    var ideacamp = elem.id.replace('idea','');
    $('#tb4').html();
    $.ajax({
        type: "POST",
        dataType: "json",
        url:'backend/campaign/getnote/',
        data: {
              campaign_id : ideacamp ;

        },
    success :function(key,value) {
            $("#hehe").append('<div style="word-wrap:break-word">'+value.idea+'</div>')

    }
    popup();
    $('#tb2').hide();
    $('#tb4').css("display","block");
    $('#div_btn').css('display','none');
    })


}

var options;

function changebtn(elem){
    options="";
    $('input[name=staf]').css("display","block");
    $('#addstaff').css("display","block");
    $('.inputDisabled').prop("disabled", false); // Element(s) are now enabled.
    $('#edit').replaceWith('<span id="changebtn"><button id="submit_edit"  class="button button-pill button-tiny button-primary">submit</button><span>');
//  get staff information
    $.ajax({
        type: "POST",     //提交方式
        //contentType: "application/json; charset=utf-8",   //内容类型
        dataType: "json",     //传回类型
        url: 'backend/staff/getallstaff',
        data: {
        },
        success: function (data) {
            //   alert(data.status);        //用data.d来获取后台传过来的json语句，或者是单纯的语句
            if (!data.status) {
             //   alert("get staff success");
                 $("input[name='staf']").replaceWith('<select id="select2" class="selectaddstaff"></select>');
                $.each(data,function (key,value) {
                    $('#select2').append('<option id="'+value.id+'">'+value.name+'</option>');
                    options+='<option id="'+value.id+'">'+value.name+'</option>';
                })}
            else alert("server error");
        },
        error: function (err) {
            alert("err:" + err);
            var obj1 = JSON.parse('{ "101":"camp_1", "106":"camp_2", "270":"camp_3","350":"camp_4"}');
            var obj2 = JSON.parse('{ "101":"camp_1", "106":"camp_2", "270":"camp_3","350":"camp_4"}');
            $("input[name='am']").replaceWith('<select id="select1"> <option>Option</option></select>');
            $("input[name='staf']").replaceWith('<select id="select2" class="selectaddstaff"></select>');
            //    $("input[name='st']").replaceWith('<select id="select3"></select>');
            $.each(obj1,function (id,name) {
                $('#select1').append('<option id="'+id+'">'+name+'</option>');
            });
            $.each(obj2,function (id,name) {
                $('#select2').append('<option id="'+id+'">'+name+'</option>');
                options+='<option id="'+id+'">'+name+'</option>';
            });
        }
    });


    //     $("input[name='staf']").replaceWith('<select> <option>Option</option> <option>Option1</option><option>Option2</option></select>');
    $('#submit_edit').click(function () {
        var st_select=[];
        $('.selectaddstaff option:selected').map(function () {
            var selectstaff = $(this).attr("id");
            //alert(b);
            var t = {};
            t.id = selectstaff;
            t.hour=
            st_select.push(t);
        });
        console.log(st_select);

        var name = $("input[name='cn']").val();
        var client = $("input[name='cd']").val();
    //    var am = $("input[name='am']").val();
        var st = $("input[name='st']").val();
        var sd = $("input[name='sd']").val();
        var ed = $("input[name='ed']").val();
        var cp = $("input[name='cp']").val();
  //      var staff = $("input[name='staf']").val();
        var cmc = $("input[name='cmc']").val();
        var ssapc = $("input[name='ssapc']").val();

        if(name.length < 1 || client.length < 1) {
            alert("Please enter Client Name and Address.");
        } else {
            $.ajax({
                type: "POST",     //提交方式
                //contentType: "application/json; charset=utf-8",   //内容类型
                dataType: "json",     //传回类型
                url: 'backend/campaign/updatecampaign',
                data: {
                    campaign_id:elem,
                    cpname: name,
                    //client: client, //id
                    //manager: am,
                    status: st,
                    start: sd,
                    end: ed,
                    contact: cp, //id
                    staff: st_select,
                    copyright: cmc,
                    ssp: ssapc,
                },
                success: function (data) {
                    //   alert(data.status);        //用data.d来获取后台传过来的json语句，或者是单纯的语句
                    if (!data.status) {
                        alert("save success");
                        $("#fade").hide();
                        $("#light").hide();
                        $('#edads').hide();
                        $('#tb4').css('display','none');
                        $('#div_btn').css('display','block');
                        $('.staffbr').replaceWith("");
                        layout1();
                    }
                    else alert("server error");
                },
                error: function (err) {
                    alert("err:" + err);
                    $("#fade").hide();
                    $("#light").hide();
                    $('#edads').hide();
                    $('#tb4').css('display','none');
                    $('#div_btn').css('display','block');
                    $('.staffbr').replaceWith("");
                    layout1();

                }
            });
        }
    })

}



