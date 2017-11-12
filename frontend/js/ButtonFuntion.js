function myfunction(){
    alert("correct")
}
function hidediv(){
    var x=document.getElementById("centercontent_left");
    x.style.display="none";
    var y=document.getElementById("centercontent_left_hide");
    y.style.display="block";
}


function insertclient() {

      $.ajax({
          type: "POST",     //提交方式
          contentType: "application/json; charset=utf-8",   //内容类型
          dataType: "text",     //传回类型
          url: 'backend/test.php',
          data: {
              client_name: $("input[name='client_name']").val(),
              client_address:$("input[name='client_address']").val(),
              contact_information:$("input[name='contact_information']").val(),
          },
          success: function (data) {
              alert(data.d);        //用data.d来获取后台传过来的json语句，或者是单纯的语句
          },
          error: function (err) {
              alert("err:" + err);
          }
      });
}

//jquery
$(document).ready(function(){
    $("#btn2").hide();
    $("#line").hide();
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
    $("#btn5").click(function(){
        $("#brline").append(" <li>Appended text</li>");
    });

})


