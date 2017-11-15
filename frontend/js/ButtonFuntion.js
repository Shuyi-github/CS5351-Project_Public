function myfunction(){
    alert("correct")
}
function hidediv(){
    var x=document.getElementById("centercontent_left");
    x.style.display="none";
    var y=document.getElementById("centercontent_left_hide");
    y.style.display="block";
}
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
  //  $(#lt1).attr('class',);
    $('.centercontent_layout0').css('display','none');
    $('.centercontent_layout1').css('display','block');
    $('.centercontent_layout2').css('display','none');
  //  var x=document.getElementsByClassName("centercontent_layout1");
  //  x.style.display="block";
}
function layout2(){
    $('.centercontent_layout0').css('display','none');
    $('.centercontent_layout1').css('display','none');
    $('.centercontent_layout2').css('display','block');
}
function insertcampaign(){
    $('#lt1_left').css('display','none');
    $('#lt1_right').css('display','none');
    $('#lt1_left_hide').css('display','block');
    $('#lt1_right_hide').css('display','block');
}
function insertclient() {
    var name = $("input[name='client_name']").val();
    var address = $("input[name='client_address']").val();
    var information = $("input[name='contact_information']").val();
    if(name.length < 1 || address.length < 1) {
        alert("Please enter Client Name and Address.");
    } else {
        $.ajax({
            type: "POST",     //提交方式
            //contentType: "application/json; charset=utf-8",   //内容类型
            dataType: "json",     //传回类型
            url: 'backend/test.php',
            data: {
                client_name: name,
                client_address: address,
                contact_information: information,
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


//jquery
$(document).ready(function(){
    $("#btn2").hide();
    $("#line").hide();
    //currenttime
    var currentdate =new Date();
    var datetime="Today:"+currentdate.getDate()+"/"
        + (currentdate.getMonth()+1)+"/"
        +currentdate.getFullYear()+"@"
        +currentdate.getHours()+":"
        +currentdate.getMinutes();
    $("#welcome").replaceWith("welcome back, "+datetime);

    $("#btn1").click(function(){
        $('#test').load("doc/testjson.json",function (responseTxt,statusTxt,xhr){
            if(statusTxt=="success") {
                alert("load successful");
                $('#btn1').hide();
                $('#btn2').show();
                $('#line').show();
            }
            else alert("Error: "+xhr.status+": "+xhr.statusText);
        })
    });
    $("#btn2").click(function(){
        $("#line").append(" <li>Appended text</li>");
    });
    $("#btn3").click(function(){
        $("#fade").show();
        $("#light").show();
    });
    $("#btn4").click(function(){
        $("#fade").hide();
        $("#light").hide();
    });
    $("#fade").click(function(){
        $("#fade").hide();
        $("#light").hide();
    });
    $("#btn5").click(function(){
        $("#brline").append(" <li>Appended text</li>");
    });
})
