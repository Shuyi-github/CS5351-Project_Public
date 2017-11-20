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
        $('.staffbr').replaceWith("");
        layout1();
    });
    $("#fade").click(function(){
        $("#fade").hide();
        $("#light").hide();
        $('#edads').hide();
        $('#tb4').css('display','none');
        $('#div_btn').css('display','block');
        $('.staffbr').replaceWith("");
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
        $('<br class="staffbr"><select id="selectadd" class="selectaddstaff"></select>').insertAfter($('#select2'));
        $('#selectadd').append(''+options+'');

    });
    $('#addselector').click(function (e) {
        //console.log("add_click");
        e.preventDefault();

        $('<tr><td><select class="selectaddpr"></select></td><td><input type="text" class="inputpr" placeholder="eg. 8000"> </input></td></tr>').insertAfter($('#pr1'));
          $('.selectaddpr').each(function(){
            $(this).append(''+option+'');
          });  
      //  $('#selectadd').append(''+options+'');

    });
 /*   if(CONFIG.role){
            1:am;
            0:senior;
            2:creativestaff
            3:purchase
    }
*/
})
