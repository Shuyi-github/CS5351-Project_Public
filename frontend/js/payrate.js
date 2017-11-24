var option;
function topayrate(){
    option="";
    $.ajax({
        type: "POST",     //提交方式
        //contentType: "application/json; charset=utf-8",   //内容类型
        dataType: "json",     //传回类型
        url: 'backend/staff/getallstaff',
        data: {
        },
        success: function (data) {
            if (!data.status) {
                $("#payratestaff").append('<table id="payratetable" style="align-content: center" align="center" width="1200"><tr><th align="center">'+"NAME"+'</th> <td align="center">'+"role"+'</td><td align="center">'+"payrate"+'</td></tr></table>');
                $.each(data,function (key,value) {
                    $("#payratestaff").append('<table id="payratetable" style="align-content: center" align="center" width="1200"><tr><td align="center">'+value.name+'</td> <td align="center">'+value.rolename+'</td><td align="center">'+value.staffpayrate+'</td></tr></table>')

                });
                 $('#selectpayrate').replaceWith('<select class="selectaddpr" id="selectpayrate">');
                $.each(data,function (key,value) {
                    $('#selectpayrate').append('<option id="'+value.id+'">'+value.name+'</option>');
                    option+='<option id="'+value.id+'">'+value.name+'</option>';
                })}
            else alert("server error");
        },
        error: function (err) {
            alert("err:" + err);
        }
    });
	$('.centercontent_layout0').css('display','none');
    $('.centercontent_layout1').css('display','none');
	$('.centercontent_layout2').css('display','none');

}

function submit_payrate(){
		var stf_select=[];
        $('.selectaddpr option:selected').map(function () {
            var selectstaff = $(this).attr("id");
            //alert(b);
            var t = {};
            t.id = selectstaff;
            t.payrate=$(this).parent().parent().next().children("input").val();
            stf_select.push(t);
        });
        console.log(stf_select);
        $.ajax({
        type: "POST",     //提交方式
        //contentType: "application/json; charset=utf-8",   //内容类型
        dataType: "json",     //传回类型
        url: 'backend/staff/updatepayrate',
        data: {
            staff:stf_select,
        },
        success: function (data) {
            if (!data.status) {
                 alert("save success");
                 topayrate();
                $("#payratestaff").append('<table id="payratetable" style="align-content: center" align="center" width="1200"><tr><th align="center">'+"NAME"+'</th> <td align="center">'+"role"+'</td><td align="center">'+"payrate"+'</td></tr></table>');
                $.each(data,function (key,value) {
                    $("#payratestaff").append('<table id="payratetable" style="align-content: center" align="center" width="1200"><tr><td align="center">'+value.name+'</td> <td align="center">'+value.rolename+'</td><td align="center">'+value.staffpayrate+'</td></tr></table>')

                });
                $('#selectpayrate').replaceWith('<select class="selectaddpr" id="selectpayrate">');
                $.each(data,function (key,value) {
                    $('#selectpayrate').append('<option id="'+value.id+'">'+value.name+'</option>');
                    option+='<option id="'+value.id+'">'+value.name+'</option>';
                })
            }
        },
        error: function (err) {
            alert("err:" + err);
        }
    });
}