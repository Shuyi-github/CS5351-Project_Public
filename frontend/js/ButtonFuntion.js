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
                    hidediv();
                }
                else alert("server error");
            },
            error: function (err) {
                alert("err:" + err);
                hidediv();
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
