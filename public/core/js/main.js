$(document).ready(function(){    
	$("#logo2").hover(function(){
        $(this).find('span').stop(true).fadeIn(200);
    }, function(){
        $(this).find('span').stop(true).fadeOut(200);
    });
    //on close modal
    $(document).on('hidden.bs.modal', '.modal', function () {
        $('.modal:visible').length && $(document.body).addClass('modal-open');
        $("body").css({ 'overflow-x' : 'hidden', 'overflow-y' : 'auto' });
        if(refresh === true){
            location.reload();
        }
        dialog_open = false;
        $("#notification_dialog").removeClass("bs-example-modal-lg").find(".modal-dialog").removeClass("modal-lg");
    });
    //soon
    $(".soon").prepend('<div class="soon_box radius_3px display_table bg_red align_left margin_right5px" style="padding:0px 8px;font-size:10px;">Soon</div>');
});
$(window).load(function(){
    init_components();
});
function format_datetime(e,f){
    return moment(e).format(f);
}

//hide the fieldset and the buttons holder
function hide_pokemon(){
 if($("#extra_modal").is(":visible")){
     $("#extra_modal fieldset").next().hide(function(){
        $("#extra_modal fieldset").fadeOut(200);
     });
 }else{
     $("#notification_dialog fieldset").next().hide(function(){
        $("#notification_dialog fieldset").fadeOut(200);
     });
 }
}
function init_components(){
	$('[data-toggle="tooltip"]').tooltip();
}
