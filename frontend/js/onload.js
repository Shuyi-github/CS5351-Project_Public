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
    $("#close").click(function(){
        //  $("#detail").replaceWith('<span id="detail">compaign detail.</span>');
        //  $("#select").html('');
        $("#fade").hide();
        $("#light").hide();
        $('#edads').hide();
        $('#tb4').css('display','none');
        $('#div_btn').css('display','block');
        $('.addstafh').replaceWith("");
        $('.selectads').replaceWith('<input type="text" name="cst_type" class="inputDisabled" disabled>');
        layout1();
    });
    $("#fade").click(function(){
        $("#fade").hide();
        $("#light").hide();
        $('#edads').hide();
        $('#tb4').css('display','none');
        $('#div_btn').css('display','block');
        $('.addstafh').replaceWith("");
        $('.selectads').replaceWith('<input type="text" name="cst_type" class="inputDisabled" disabled>');
        layout1();
    });
    $( "input[name='start_date']" ).datepicker({
        showButtonPanel: false
    });
    $( "input[name='end_date']" ).datepicker({
        showButtonPanel: false
    });
    $( "input[name='sd']" ).datepicker({
        showButtonPanel: false
    });
    $( "input[name='ed']" ).datepicker({
        showButtonPanel: false
    });
    $("#tb1").easyTable({
        hover:'btn-primary',
        buttons:false,
        select:true,
        sortable:false,
        scroll: {active: true, height: '400px'}
    });

//    $("#btn5").click(function(){
//        $("#brline").append(" <li>Appended text</li>");
//    })

/*    accoutmag(except modify ads)
    creativestaff(idea)
    purchase(costtype cost)
    seniormag
    */
    $('#addstaff').click(function (e) {
        //console.log("add_click");
        e.preventDefault();
        $('<tr class="addstafh"><th><select id="selectadd" class="selectaddstaff"></select></th><th><input type="text"  class="inputDisabled"> </input></th></tr>').insertAfter($('#showstaff'));
        $('#selectadd').append(''+options+'');

    });
    $('#addselector').click(function (e) {
        //console.log("add_click");
        e.preventDefault();
    // option="<option>1</option><option>2</option>";
        $('<tr><td><select class="selectaddpr" id="setpr"></select></td><td><input type="text" class="inputpr" placeholder="eg. 8000"> </input></td></tr>').insertAfter($('#pr1'));
       //   $('.selectaddpr').each(function(){
        //    $(this).append(''+option+'');
        //  });
        $('#setpr').append(''+option+'');

    });

    switch (CONFIG.role){
        case 0:
            $('#navpr').css("display","none");
            $('#changebtn').replaceWith("");
            $('#add').replaceWith("");
            break;
        case 1:
            break;
        case 2:
            $('#changebtn').replaceWith("");
            $('#add').replaceWith("");
            break;
        case 3:
            $('#changebtn').replaceWith("");
            $('#add').replaceWith("");
            break;
        default:
        /*    alert("you have no right");
            $('#navpr').css("display","none");
            $('#changebtn').replaceWith("");
            $('#add').replaceWith("");
    */
    }

 /*   if(CONFIG.role){
            0:senior;
            1:am;
            2:creativestaff
            3:purchase
    }
*/
})
