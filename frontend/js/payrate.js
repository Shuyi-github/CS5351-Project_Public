function topayrate(){
	$('.centercontent_layout0').css('display','none');
    $('.centercontent_layout1').css('display','none');
	$('.centercontent_layout2').css('display','none');

}
function submit_payrate(){
		var stf_select=[];
        $('.selectaddpr option:selected').map(function () {
            var selectstaff = $(this).val();
            //alert(b);
            var t = {};
            t.id = selectstaff;
            t.payrate=$($(this).closest("<td>").find("<input>")).val();
            stf_select.push(t);
        });
        console.log(stf_select);
        var pr_input=[];
        $('.inputpr').map(function () {
            var pr = $(this).val();
            //alert(b);
            var p = {};
            p.payrate = pr;
            pr_input.push(p);
        });
        console.log(pr_input);

}