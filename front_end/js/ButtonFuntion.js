function myfunction(){
    alert("correct")
}
function hidediv(){
    var x=document.getElementById("centercontent_left");
    x.style.display="none";
    var y=document.getElementById("centercontent_left_hide");
    y.style.display="block";
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

function test(){

}

