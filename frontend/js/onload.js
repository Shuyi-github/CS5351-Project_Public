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
        $("#detail").replaceWith('<span id="detail">compaign detail.</span>');
        $("#fade").hide();
        $("#light").hide();
    });
    $("#fade").click(function(){
        $("#fade").hide();
        $("#light").hide();
    });


//    $("#btn5").click(function(){
//        $("#brline").append(" <li>Appended text</li>");
//    })

})
