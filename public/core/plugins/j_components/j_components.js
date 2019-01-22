// Automatically cancel unfinished ajax requests 
// when the user navigates elsewhere.
  var xhrPool = [],global_spinner_conf=true;
  $(document).ajaxSend(function(e, jqXHR, options){
    xhrPool.push(jqXHR);
  });
  $(document).ajaxComplete(function(e, jqXHR, options) {
    xhrPool = $.grep(xhrPool, function(x){return x!=jqXHR});
  });
  var abort = function() {
    $.each(xhrPool, function(idx, jqXHR) {
      jqXHR.abort();
    });
  };

  var oldbeforeunload = window.onbeforeunload;
  window.onbeforeunload = function() {
    var r = oldbeforeunload ? oldbeforeunload() : undefined;
    if (r == undefined) {
      // only cancel requests if there is no prompt to stay on the page
      // if there is a prompt, it will likely give the requests enough time to finish
      abort();
    }
    return r;
  }

/* ###################### J COMPONENTS ###################### 
Author: Dodong Juliver
*/
var refresh = false,dialog_open = false;
//center any element, tho' not working by class, elements ID is recommended. To use, $("element").center()
$.fn.center = function () {this.css("top", ( $(window).height() - this.height() ) / 2  + "px");this.css("left", ( $(window).width() - this.width() ) / 2 + "px");return this;}
//validate email. To use, IsEmail(element)
function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
return regex.test(email);
}
//limit the text from the target element, to use limitText("[element class or ID]", [minimum text], [maximum text]);
function limitText(el, limit, crop){
    // $('.limit_text').text($('.limit_text').text().substring(0,0) + '.....');
    $(el).each(function(){
       if(crop !== 0){
        var txt= $(this).text();
        if(txt.length > limit){
            $(this).text(txt.substring(0,crop) + '.....');
        }
        }else{
            $(this).text($(this).text().substring(0,crop) + '.....');
        } 
    });
}
//apply shadow to the specified element. To use, j_shadow("[specify the target element, a class element or an element by ID]", '[specify the color of the shadow, you can use rgba, hex color or a string color e.g. red, blue, green etc..]', '[specify the length of the shadow e.g. 50, 100 or whatsoever]', '[specify the position of the shadow e.g. top, left, right, bottom, top-left, top-right, bottom-left, bottom-right]')
function j_shadow(j_el, j_color, j_length, j_position){
    //required longshadow js
    $(j_el).longShadow({
        colorShadow: j_color,
        sizeShadow: j_length,
        directionShadow: j_position
    });
}
//add loading animation or a loading spinner. To use j_loading("[specify if show or hide e.g. on or off]", "[specify a theme to be used, e.g. white or dark]", "[specify if whos spinner or not e.g. yes or no]")
function j_loading(status, theme, spinner){
    switch(theme){
        case "white" :
            if(status === "on"){
                $("body").append('<div id="white_spinner_theme"></div><div class="windows8"><div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_3"> <div class="wInnerBall"></div></div><div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div></div>');
                $("#white_spinner_theme").fadeIn(200, function(){if(spinner === "yes") $(".wBall, .windows8").show(); else $(".windows8").hide();});
                $("#white_spinner_theme").center();
                $(".windows8").center();
                $("body").css({ 'overflow' : 'hidden' });
            }else{
                $(".wBall, .windows8").remove();
                $("#white_spinner_theme").fadeOut(200,function(){
                    $(this).remove();
                    $("body").css({ 'overflow-y' : 'auto' });
                });
            }
        break;
    case "dark" :
        if(status === "on"){
            $("body").append('<div id="dark_spinner_theme"></div><div class="sk-fading-circle"> <div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>');
            $("#dark_spinner_theme").fadeIn(200, function(){if(spinner === "yes") $(".sk-fading-circle").show(); else $(".sk-fading-circle").hide();});
            $("#dark_spinner_theme").center();
            $(".sk-fading-circle").center();
            $("body").css({ 'overflow' : 'hidden' });
        }else{
            $(".sk-fading-circle").remove();
            $("#dark_spinner_theme").fadeOut(200,function(){
                $(this).remove();
                $("body").css({ 'overflow-y' : 'auto' });
            });
        }
    break;
    }
}
//to use, notification([title of the modal box], [you can specify a string, a variable or a custom element html contents], "[specify the functions to be called. If multiple, it must be separated with a space]")
function notification(title, content, dependencies){
    dialog_open = true;
    //required materialize
    $("#notification_dialog .modal-title").html(title);
    $("#notification_dialog .modal-body").html(content);
    $("#notification_trigger_button").trigger("click");
    get_dependencies(dependencies);
}
//extra modal
function extra_modal(title, content, dependencies){
    dialog_open = true;
    //required materialize
    $("#extra_modal .modal-title").html(title);
    $("#extra_modal .modal-body").html(content);
    $("#extra_modal_trigger_button").trigger("click");
    $("body").css({ 'overflow' : 'hidden' });
    get_dependencies(dependencies);
}
//run those functions specified from the called functions argument. To use, get_dependencies(function1 function2 function3 function4)
function get_dependencies(dependencies){
    //check if attr 'success-function' exist and not empty
    if(typeof dependencies !== typeof undefined && dependencies !== false && dependencies !== "") {
        var classList = dependencies.split(/\s+/);
        $.each(classList, function(index, item) {
            window[item]();
        });
    }

}
//lively pull a page. To use, get_page([the request page, note: the request page must be equal to the name of the file e.g. pulled_page.php], [cotainer class or element, where the pulled content will be placed], [dependecines, if multiple, it must be separated with a space])
function get_page(this_tab_content_link, container, dependencies){

    $.ajax({
        url : $("body").attr("data-link") + '/ajax-page',
        type : 'get',
        context: this,
        dataType : 'html',
        beforeSend: function(){j_loading("on", "white", "yes");},
        complete: function(){j_loading("off", "white", "no");},
        data : { page : this_tab_content_link, _token : $("body").attr("data-token") },
        success : function(data) {
            $(container).html(data);
            get_dependencies(dependencies);
        }
    });
}
//create a notification. To use, j_notification("[specift the content]", "[specify if autohide]", "[specify if yes or no]")
function j_notification(data, auto_hide, hide){
        if(auto_hide !== "yes"){
            if($("#j_notification_dialog").length){
                $("#j_notification_dialog").html(data);
                $("#j_notification_dialog").show();
            }else{
                $("body").append('<div class="display_table thehide extend clear animated slideInRight shadow-z-1" id="j_notification_dialog">' + data + '</div>'); 
                $("#j_notification_dialog").show();
            }
            if(hide === "yes"){
                $("#j_notification_dialog").delay(3000).fadeOut(500);
            }
        }else{
            if($("#j_notification_dialog").length){
                $("#j_notification_dialog").html(data);
                $("#j_notification_dialog").show();
            }else{
                $("body").append('<div class="display_table thehide extend clear animated slideInRight shadow-z-1" id="j_notification_dialog">' + data + '</div>'); 
                $("#j_notification_dialog").show();
            }
            $("#j_notification_dialog").delay(5000).fadeOut(500);
        }
    }   
$(document).ready(function(){
        //token set up
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $("body").attr("data-token")
            }
        });
        $(".thehide").hide();
        $(document).on("keypress keydown keyup",".dont_write",function(){return false;});
        //email validation
        $(".validate_email").focusout(function(){
            if(!IsEmail($(this).val())){
                alert("Wassup! wassup? it ain't no no valid email bruh! don't ya dare fool me!")
                $(this).focus();
            }
        });
        //allow only numbers
        $(document).on("keydown", ".numbersonly", function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                 // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) || 
                 // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                     // let it happen, don't do anything
                     return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
        //add animation to the element that has a class of .line_animation
        var this_previous_delay;
        $(".perent .line_animation").each(function(){
            var this_delay;

            if(!$(this).is(":first-child")){
                    this_delay = this_previous_delay + 300;
                    this_previous_delay = this_delay;
                    this_delay = this_delay.toString() + "ms";
            }else{
                this_delay = $(this).index() + 300;
                this_previous_delay = this_delay;
                this_delay = this_delay.toString() + "ms";
            } //end of checking if not first-child
            
            $(this).css('-webkit-transition-delay', this_delay )
               .css('-moz-transition-delay', this_delay)
               .css('-ms-transition-delay', this_delay)
               .css('-o-transition-delay', this_delay)
               .css('transition-delay', this_delay);

        }); //end of looping unto the top_submenu li
        //end of .line_animation
    //j menu
    $(document).on("click", ".j_components .j_menu .j_menu_nav a", function(e){
            var this_current = $(this);
            //if ajax
            if(this_current.attr("data-ajaxpage") === "yes"){get_page(this_current.attr("href").substring(1), this_current.attr("data-ajax-render"), this_current.attr("data-dependencies"));}
            //if allowed to set an active state and active indentifier
            if(this_current.attr("data-allow-active") === "yes"){
                if(this_current.attr("data-has-submenu") === "no" || !this_current.attr("data-has-submenu") || this_current.attr("data-submenu-allowactive") === "yes"){
                    this_current.closest(".j_menu_nav").find(".j_parent").removeClass("j_active j_active_state");
                    this_current.addClass("j_active j_active_state");
                }
            }
            //if tabs
            if(this_current.attr("data-tabs") === "yes"){
                $("#"+this_current.closest(".j_menu_nav").attr("data-tabs-container")+" > .j_tabs").removeClass("active_tab").hide();
                $("#"+this_current.closest('[data-tabs-container]').attr("data-tabs-container")+" "+this_current.attr("href")).addClass("active_tab").fadeIn(200);
                var custom_function = this_current.attr("data-monkey-run");
                if(typeof custom_function !== typeof undefined && custom_function !== false && custom_function !== "") {
                    var classList = custom_function.split(/\s+/);
                    $.each(classList, function(index, item) {
                      window[item]();
                    });
                }
                checkwidth();

            }
            //if there's a submenu
            if(this_current.attr("data-has-submenu") === "yes"){
                if(this_current.next(".j_menu_dp_container").is(":visible")){
                    this_current.next(".j_menu_dp_container").fadeOut(200);

                    //run data-on-close function on close event of dropdown menu
                    var on_close = this_current.attr("data-on-close");
                    if(typeof on_close !== typeof undefined && on_close !== false && on_close !== "") {
                        var classList = on_close.split(/\s+/);
                        $.each(classList, function(index, item) {
                          window[item]();
                        });
                    }
                    
                }else{
                    this_current.next(".j_menu_dp_container").css({ 'display': 'table','min-width' : this_current.closest("li").width() + 'px' }).fadeIn(200);
                    if(this_current.next(".j_menu_dp_container").offset().left+(this_current.next(".j_menu_dp_container").width()*1) > $(window).width()){
                        this_current.next(".j_menu_dp_container").css({ 'margin-left' : "-110px" });
                    }
                    //if(this_current.next(".j_menu_dp_container").offset().top+(this_current.next(".j_menu_dp_container").height()*1) > $(window).height()){
                    //    this_current.next(".j_menu_dp_container").css({ 'margin-top' : -(this_current.height()+this_current.next(".j_menu_dp_container").height()+40)+'px' });
                    //}

                    //run data-on-close function on close event of dropdown menu
                    var on_open = this_current.attr("data-on-open");
                    if(typeof on_open !== typeof undefined && on_open !== false && on_open !== "") {
                        var classList = on_open.split(/\s+/);
                        $.each(classList, function(index, item) {
                          window[item]();
                        });
                    }
                }
                if(this_current.next(".j_menu_dp_container").height() >= 400){
                    this_current.next(".j_menu_dp_container").css({ 'height' : '300px' });
                }
            }else{
                if(!this_current.hasClass("dont_hide")){
                    $(".top_submenu").hide();
                    $($(this).attr("data-has-submenu")).show().find("li").show();
                }
            } // end of else if sub-menu is not equal to yes
            if(this_current.attr("data-navigate") !== "yes"){
                e.preventDefault();
            }
    });
    //menu mouseover
    $(document).on("mouseover", ".j_components .j_menu .j_menu_nav a", function(e){
            var this_current = $(this);
            if(this_current.attr("data-allow-hover") === "yes"){
        this_current.closest(".j_menu_nav").find(".j_parent").removeClass("j_active_state");
        this_current.addClass("j_active_state");
        }
            }).on("mouseleave", ".j_menu .j_menu_nav a", function(){
            var this_current = $(this);
            this_current.removeClass("j_active_state");
            this_current.closest(".j_menu_nav").find(".j_active").addClass("j_active_state");
            });

    //when click on the menu's dropdown
    $(document).on("click", ".j_menu_dp_container li a", function(e){
            var this_current = $(this);
            if(this_current.closest(".j_menu_dp_container").attr("data-allow-menureplace") === "yes"){
              this_current.closest(".j_menu_dp_container").prev(".j_parent").find(".j_text").text(this_current.text());
            }
            if(this_current.closest(".j_menu_dp_container").attr("data-allow-menuhide") === "yes" ){
                if(!this_current.next().hasClass("j_menu_dp_container")){
                    this_current.closest(".j_menu_dp_container").fadeOut(200); 
                }
            }
            if(this_current.closest(".j_menu_dp_container").attr("data-submenu-allowactive") === "yes" ){
                 this_current.closest(".j_menu_nav").find(".j_parent").removeClass("j_active j_active_state");
                 this_current.closest(".j_menu_dp_container").prev(".j_parent").addClass("j_active j_active_state");
            }
    });

    //j accordion
    $(document).on("click", ".j_components .j_accordion .j_accordion_header", function(){
        var this_current = $(this);
        if(this_current.attr("data-toggle") === "yes"){
            this_current.closest(".j_accordion").find(".j_accordion_content").slideUp(100, function(){
                this_current.next(".j_accordion_content").slideDown();
            });
        }else{
            this_current.next(".j_accordion_content").slideDown();
        }
    });
    //event click j menu listener
    $(document).on("mousedown touchstart",function (e) {    
        var calendar = $(".dtp-content"),j_dp = $(".j_menu_dp_container,.que_chat_dp,.dynamic-input");
        if (!j_dp.is(e.target) && calendar.has(e.target).length === 0 && j_dp.has(e.target).length === 0) {
            j_dp.stop(true).fadeOut(200);
            //run data-on-close function on close event of dropdown menu
            var on_close = $(".j_menu_dp_container:visible").prev('a[data-has-submenu="yes"]').attr("data-on-close");
            if(typeof on_close !== typeof undefined && on_close !== false && on_close !== "") {
                var classList = on_close.split(/\s+/);
                $.each(classList, function(index, item) {
                  window[item]();
                });
            }
        }
    });
    $(window).resize(function(){
        $("#white_spinner_theme").fadeOut(200);
        $(".windows8").center();
        $(".sk-fading-circle").center();
        $("dark_spinner_theme").center(200);
        $(".j_menu_dp_container").hide();
    });
   //add animation to the element that has a class of .line_animation
        var this_previous_delay;
        $(".perent .line_animation").each(function(){
            var this_delay;

            if(!$(this).is(":first-child")){
                    this_delay = this_previous_delay + 300;
                    this_previous_delay = this_delay;
                    this_delay = this_delay.toString() + "ms";
            }else{
                this_delay = $(this).index() + 300;
                this_previous_delay = this_delay;
                this_delay = this_delay.toString() + "ms";
            } //end of checking if not first-child
            
            $(this).css('-webkit-transition-delay', this_delay )
               .css('-moz-transition-delay', this_delay)
               .css('-ms-transition-delay', this_delay)
               .css('-o-transition-delay', this_delay)
               .css('transition-delay', this_delay);

        }); //end of looping unto the top_submenu li
        //end of .line_animation

// ##################################### AJAX FORM TOOLS #####################################
//<form class="ejex_form" action="[url]" method="[post/get] default 'post' " data-onsuccess="[specified the function you want the success response to be pass on]" data-message-place="[if specified is 'this' then the message will be prepended unto the form else, the data-message-place e.g class or ID will be used a container for the message]" data-custom-message="[custom message e.g. successfully save to file]" data-success-function="[list all the functions you want to run when ajax response returns true, e.g. myFunctionOne myFunctionTwo .. note: separate each function with space, if multiple functions]" data-fail-function="[list all the functions you want to run when ajax response returns false, e.g. myFunctionOne myFunctionTwo .. note: separate each function with space, if multiple functions]" data-constructor-function="[list all the functions you want to run automatically when the event finish, e.g. myFunctionOne myFunctionTwo .. note: separate each function with space, if multiple functions]">
        //EXAMPLE
        $(document).on("submit", ".ejex_form", function(e){
            abort();
            dialog_open = true;
            e.preventDefault();
            //declare the major variables
            var this_current = $(this),datatype = $(this).attr("data-type"),method = $(this).attr("method"), custom_message = $(this).attr("data-custom-message"), msg = this_current.attr("data-message-place"), custom_on_success = $(this).attr("data-onsuccess");
             //check if attr 'method' exist and not empty
            if(typeof method === typeof undefined && method === false && method === "") {
                method = "post";
            }
            //check if attr 'custom-message' exist and not empty
            if(typeof custom_message === typeof undefined && custom_message === false && custom_message === "") {
                custom_message = "Successfully saved!";
            }
            //check if attr 'custom-message' exist and not empty
            if(typeof datatype === typeof undefined && datatype === false && datatype === "") {
                datatype = 'html';
            }
            var formData = new FormData(this_current[0]);
            $.ajax({
                url : this_current.attr("action"),
                type : method,
                data : formData,
                dataType : datatype,
                cache: false,
                async: true,
                contentType: false,
                processData: false,
                beforeSend: function(){
                    if(global_spinner_conf===true){
                        j_loading("on", "white", "yes");
                    }
                },
                complete: function(){
                    if(global_spinner_conf===true){
                        j_loading("off", "white", "yes");
                    }
                },
                success: function(e){
                    var success_transaction = false;
                    $(".alert").remove();
                    //check if attr 'datatype' exist and not empty
                    if(typeof custom_on_success !== typeof undefined && custom_on_success !== false && custom_on_success !== "") {
                        if(e.success){
                            if(custom_message !== "none"){
                                if(typeof msg !== typeof undefined && msg !== false && msg !== "") {
                                    $(msg).html('<div class="font_size13px alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times" aria-hidden="true"></i></button><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding_right10px" valign="middle"><i class="fa fa-check-circle" aria-hidden="true"></i></td><td class="font_size13px text_align_left">'+custom_message+'</td></tr></table></div>');
                                }else{
                                    this_current.prepend('<div class="font_size13px alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times" aria-hidden="true"></i></button><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding_right10px" valign="middle"><i class="fa fa-check-circle" aria-hidden="true"></i></td><td class="font_size13px text_align_left">'+custom_message+'</td></tr></table></div>');
                                }
                            }
                            success_transaction = true;
                            window[custom_on_success](e);
                        }else{
                            if(custom_message !== "none"){
                                if(typeof msg !== typeof undefined && msg !== false && msg !== "") {
                                    $(msg).html('<div class="font_size13px alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times" aria-hidden="true"></i></button><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding_right10px" valign="middle"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></td><td class="font_size13px text_align_left">'+e.message+'</td></tr></table></div>');
                                }else{
                                    this_current.prepend('<div class="font_size13px alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times" aria-hidden="true"></i></button><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding_right10px" valign="middle"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></td><td class="font_size13px text_align_left">'+e.message+'</td></tr></table></div>');
                                }
                            }
                            success_transaction = false;
                        }
                    }else{
                        if(datatype === 'json'){
                            if(e.success){
                                if(custom_message !== "none"){
                                    if(typeof msg !== typeof undefined && msg !== false && msg !== "") {
                                        $(msg).html('<div class="font_size13px alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times" aria-hidden="true"></i></button><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding_right10px" valign="middle"><i class="fa fa-check-circle" aria-hidden="true"></i></td><td class="font_size13px text_align_left">'+custom_message+'</td></tr></table></div>');
                                    }else{
                                        this_current.prepend('<div class="font_size13px alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times" aria-hidden="true"></i></button><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding_right10px" valign="middle"><i class="fa fa-check-circle" aria-hidden="true"></i></td><td class="font_size13px text_align_left">'+custom_message+'</td></tr></table></div>');
                                    }
                                }
                                success_transaction = true;
                            }else{
                                if(custom_message !== "none"){
                                    if(typeof msg !== typeof undefined && msg !== false && msg !== "") {
                                        $(msg).html('<div class="font_size13px alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times" aria-hidden="true"></i></button><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding_right10px" valign="middle"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></td><td class="font_size13px text_align_left">'+e.message+'</td></tr></table></div>');
                                    }else{
                                        this_current.prepend('<div class="font_size13px alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times" aria-hidden="true"></i></button><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding_right10px" valign="middle"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></td><td class="font_size13px text_align_left">'+e.message+'</td></tr></table></div>');
                                    }
                                }
                                success_transaction = false;
                            }
                        }else{
                            if($.trim(e) === "success"){
                                if(custom_message !== "none"){
                                    if(typeof msg !== typeof undefined && msg !== false && msg !== "") {
                                        $(msg).html('<div class="font_size13px alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times" aria-hidden="true"></i></button><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding_right10px" valign="middle"><i class="fa fa-check-circle" aria-hidden="true"></i></td><td class="font_size13px text_align_left">'+custom_message+'</td></tr></table></div>');
                                    }else{
                                        this_current.prepend('<div class="font_size13px alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times" aria-hidden="true"></i></button><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding_right10px" valign="middle"><i class="fa fa-check-circle" aria-hidden="true"></i></td><td class="font_size13px text_align_left">'+custom_message+'</td></tr></table></div>');
                                    }
                                }
                                success_transaction = true;
                            }else{
                                if(custom_message !== "none"){
                                    if(typeof msg !== typeof undefined && msg !== false && msg !== "") {
                                        $(msg).html('<div class="font_size13px alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times" aria-hidden="true"></i></button><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding_right10px" valign="middle"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></td><td class="font_size13px text_align_left">'+e+'</td></tr></table></div>');
                                    }else{
                                        this_current.prepend('<div class="font_size13px alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times" aria-hidden="true"></i></button><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding_right10px" valign="middle"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></td><td class="font_size13px text_align_left">'+e+'</td></tr></table></div>');
                                    }
                                }
                                success_transaction = false;
                            }
                        }
                    }
                    //on success parameter
                    if(success_transaction === true){
                        //check if attr 'success-function' exist and not empty
                        var custom_function = this_current.attr("data-success-function");
                        if(typeof custom_function !== typeof undefined && custom_function !== false && custom_function !== "") {
                            var classList = custom_function.split(/\s+/);
                            $.each(classList, function(index, item) {
                              window[item]();
                            });
                        }
                    }else{
                        //check if attr 'fail-function' exist and not empty
                        var custom_function = this_current.attr("data-fail-function");
                        if(typeof custom_function !== typeof undefined && custom_function !== false && custom_function !== "") {
                            var classList = custom_function.split(/\s+/);
                            $.each(classList, function(index, item) {
                              window[item]();
                            });
                        }
                    }

                }

            });
            
            //check if attr 'constructor-function' exist and not empty
            var custom_function = this_current.attr("data-constructor-function");
            if(typeof custom_function !== typeof undefined && custom_function !== false && custom_function !== "") {
                var classList = custom_function.split(/\s+/);
                $.each(classList, function(index, item) {
                  window[item]();
                });
            }
            if(!$("#notification_dialog,#extra_modal").is(":visible")){
                dialog_open = false;    
            }
            
        });
        // ##################################### END AJAX FORM TOOLS #####################################
        //modify the textarea
        $(document).on('keypress keyup keydown','.datepicker,.timepicker',function(){
            return false;
        });
        // *************************************************** J  T I M E P I C K E R ***************************************************
       //init timepicker
       j_timepicker();
        $(document).on("click",".timepicker",function(){
            if($(this).val()!==""){
                var time = $(this).val().replace(':',' ').split(' ');
                $(this).closest(".perent").find('select[name="hours"]').val(time[0]).trigger("change");
                $(this).closest(".perent").find('select[name="minutes"]').val(time[1]).trigger("change");
                $(this).closest(".perent").find('select[name="am_pm"]').val(time[2].toLowerCase()).trigger("change");
            }
            $(this).closest(".perent").find(".j_components .j_parent").trigger("click");
        });
        $(document).on("click",".j_timepicker_ok",function(e){
            e.preventDefault();
            $(this).closest(".j_timepicker").closest(".perent").find(".timepicker").val($(this).closest(".j_timepicker").find('select[name="hours"]').val()+":"+$(this).closest(".j_timepicker").find('select[name="minutes"]').val()+" "+$(this).closest(".j_timepicker").find('select[name="am_pm"]').val().toUpperCase()).closest(".perent").find(".j_timepicker .j_menu_dp_container").fadeOut(200);
        });
        $(document).on("click",".j_timepicker_current",function(e){
            e.preventDefault();
            $(this).closest(".j_timepicker").closest(".perent").find(".timepicker").val(moment().format('hh')+":"+moment().format("mm")+" "+moment().format('A')).closest(".perent").find(".j_timepicker .j_menu_dp_container").fadeOut(200);
        });
        // *************************************************** J  D A T E P I C K E R ***************************************************
        //init datepicker
        j_datepicker();
        var days_change=false;
        $(document).on("click",".datepicker",function(){
            if($(this).val()!==""){
                var dates = $(this).val().replace(',','').split(' ');
                $(this).closest(".perent").find('.j_datepicker select[name="months"] option[value="'+dates[0]+'"]').prop("selected",true).closest("select").trigger("change");
                days_change=dates[1];
                $(this).closest(".perent").find('.j_datepicker select[name="years"] option[value="'+dates[2]+'"]').prop("selected",true).closest("select").trigger("change");
            }else{
                days_change=false;
            }
            $(this).closest(".perent").find(".j_components .j_parent").trigger("click");
        });
        $(document).on("click",".j_datepicker_ok",function(e){
            e.preventDefault();
            $(this).closest(".j_datepicker").closest(".perent").find(".datepicker").val($(this).closest(".j_datepicker").find('select[name="months"]').val()+" "+$(this).closest(".j_datepicker").find('select[name="days"]').val()+", "+$(this).closest(".j_datepicker").find('select[name="years"]').val()).closest(".perent").find(".j_datepicker .j_menu_dp_container").fadeOut(200);
        });
        $(document).on("click",".j_datepicker_current",function(e){
            e.preventDefault();
            $(this).closest(".j_datepicker").closest(".perent").find(".datepicker").val(moment().format('MMMM')+" "+moment().format("D")+", "+moment().format('YYYY')).closest(".perent").find(".j_datepicker .j_menu_dp_container").fadeOut(200);
        });
        $(document).on("change",'.j_datepicker select[name="months"],.j_datepicker select[name="years"]',function(){
            if($(this).val()!==""){
                var days='';
                $.each(getDaysArray($(this).closest(".j_datepicker").find('select[name="years"]').val(),$(this).closest(".j_datepicker").find('select[name="months"] option:selected').attr("data-month")),function(index,value){
                    var dd = "0"+value.toString();
                    days+='<option value="'+dd.slice(-2)+'">'+dd.slice(-2)+'</option>';
                });
                $(this).closest(".j_datepicker").find('select[name="days"]').html(days);
                if(days_change!==false){
                    $(this).closest(".j_datepicker").find('select[name="days"] option[value="'+days_change+'"]').prop("selected",true).closest("select").trigger("change");
                }else{
                    $(this).closest(".j_datepicker").find('select[name="days"] option:first-child').prop("selected",true).closest("select").trigger("change");
                }
                // console.log(moment($(this).closest(".j_datepicker").find('select[name="months"]').val()).format("M"));
                if($('#notification_dialog input[name="type"]').val()==="early ob"){
                    var month = moment().format("MMMM"),day = moment().format("DD");
                    if($(this).val().toLowerCase()===month.toLowerCase()){
                         $('#notification_dialog input[name="date"]').closest(".perent").find('.j_menu_dp_container select[name="days"] option[value="'+day+'"]').prop("selected",true).closest("select").trigger("change");
                        $('#notification_dialog input[name="date"]').closest(".perent").find('.j_menu_dp_container select[name="days"] option[value="'+day+'"]').prevAll().prop("disabled",true);
                    }
                }
            }
        });
        // *************************************************** E N D  J  D A T E P I C K E R ***************************************************
});

$(window).load(function(){
    $("body").fadeIn(200);
    //run the checkwidth function
    checkwidth();
    //on window resize
    $(window).resize(function(){
        //run the checkwidth function
        checkwidth();
    });
});

function checkwidth(){
    //$(".overflow_x:visible table").hide();
    //give a full height to those element that has a class of "full height"
    $(".full_height").css({ 'height' : $(window).height() + 'px' });
    //give width to elements that has a class of ".fixed_child" equals to the parent reference element width that has a class of ".fixed_parent"
    $(".fixed_child").each(function(){
        $(this).css({ 'width' : $(this).closest(".fixed_parent").width() + 'px' });
    });
    //give height to the elements that has a class of ".fixed_parent" equals to its first child element height that has a class of ".fixed_child"
    $(".fixed_parent").each(function(){
         $(this).css({ 'height' : $(this).find(".fixed_child:first-child").innerHeight() + 'px' });
    }); 
}
function j_timepicker(){
    $(".j_timepicker").remove();
    $('.time,.timepicker,.time_input').attr({ 'readonly' : false, 'placeholder' : 'Click to select time...' }).removeClass("dont_write").addClass("timepicker").wrap('<div></div>').parent().addClass("perent").closest(".overflow_auto").removeClass("overflow_auto");
    var hours = '<select class="form-control j_timepicker_hrs" style="width:70px;" name="hours">';
    for(i=1;i<13;i++){
        var hrs = "0"+i.toString();
        hours+='<option value="'+hrs.slice(-2)+'">'+hrs.slice(-2)+'</option>';
    }
    hours+='</select>';
    var minutes = '<select class="form-control" style="width:70px;" name="minutes"><option value="00">00</option>';
    for(i=1;i<60;i++){
        var mins = "0"+i.toString();
        minutes+='<option value="'+mins.slice(-2)+'">'+mins.slice(-2)+'</option>';
    }
    minutes+='</select>';
    var am_pm = '<select class="form-control" style="width:70px;" name="am_pm">';
    am_pm+='<option value="am">AM</option>';
    am_pm+='<option value="pm">PM</option>';
    am_pm+='</select>';
    $(".timepicker").after('<div class="j_components j_timepicker"><div class="j_menu"><ul class="j_menu_nav list_style_none clear padding_zero margin_zero">'+
        '<li class="list_style_none clear"><a href="#" class="j_parent" data-has-submenu="yes" style="display:none;">click</a>'+
            '<ul class="j_menu_dp_container list_style_none thehide bg_white padding_15px radius_3px shadow-z-1" style="border:1px solid #ededed;margin-top:0px;">'+
                '<li class="list_style_none"><div class="display_table">'+
                    '<div class="display_row"><div class="display_cell padding_right7px"><span class="font_size10px font_500">HOURS:</span><br>'+hours+'</div><div class="display_cell padding_right7px"><span class="font_size10px font_500">MINUTES:</span><br>'+minutes+'</div><div class="display_cell"><span class="font_size10px font_500">AM/PM:</span><br>'+am_pm+'</div></div></div>'+
                    '<div class="display_table margin_top10px"><div class="display_row"><div class="display_cell padding_right10px"><a href="#" class="btn btn-default margin_zero j_timepicker_current" style="padding:5px 8px;font-size:13px;">CURRENT TIME</a></div><div class="display_cell"><a href="#" class="btn btn-success margin_zero j_timepicker_ok" style="padding:5px 8px;font-size:13px;">OK</a></div></div></div>'+
                '</li>'+
            '</ul>'+
        '</li>'+
        '</ul></div></div>');
}
//days function
var getDaysArray = function(year, month) {
  // var names = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];
  var date = new Date(year, month-1, 1);
  var result = [];
  while (date.getMonth() == month-1) {
    // result.push(date.getDate()+"-"+names[date.getDay()]);
    result.push(date.getDate());
    date.setDate(date.getDate()+1);
  }
  return result;
}
function j_datepicker(){
    $(".j_datepicker").remove();
    $('.datepicker,.materia_datepicker').attr({ 'readonly' : false, 'placeholder' : 'Click to select date...' }).removeClass("dont_write").addClass("datepicker").wrap('<div></div>').parent().addClass("perent").closest(".overflow_auto").removeClass("overflow_auto");
    
    //years
    var start_year = 1930,current_year = new Date().getFullYear(),years='<select class="form-control" style="width:90px;" name="years">';
    for (var i = start_year; i <= current_year; i++) {
        if(i===parseInt(moment().format('YYYY')))
            years+='<option value="'+i+'" selected>'+i+'</option>';
        else
            years+='<option value="'+i+'">'+i+'</option>';
    }
    years+='</select>';
    //months
    var list_months = [[1,'January'],[2,'February'],[3,'March'],[4,'April'],[5,'May'],[6,'June'],[7,'July'],[8,'August'],[9,'September'],[10,'October'],[11,'November'],[12,'December']],months='<select class="form-control" style="width:95px;" name="months">';
    $.each(list_months,function(index,value){
        if(value[1].toUpperCase()===moment().format('MMMM').toUpperCase())
            months+='<option value="'+value[1]+'" data-month="'+value[0]+'" selected>'+value[1]+'</option>';
        else
            months+='<option value="'+value[1]+'" data-month="'+value[0]+'">'+value[1]+'</option>';
    });
    months+='</select>';
    //days
    var days = '<select class="form-control" style="width:70px;" name="days">';
    $.each(getDaysArray(moment().format("YYYY"),moment().format('M')),function(index,value){
        var dd = "0"+value.toString();
        if(value===parseInt(moment().format('D')))
            days+='<option value="'+dd.slice(-2)+'" selected>'+dd.slice(-2)+'</option>';
        else
            days+='<option value="'+dd.slice(-2)+'">'+dd.slice(-2)+'</option>';
    });
    days+='</select>';
    $(".datepicker").after('<div class="j_components j_datepicker"><div class="j_menu"><ul class="j_menu_nav list_style_none clear padding_zero margin_zero">'+
        '<li class="list_style_none clear"><a href="#" class="j_parent" style="display:none;" data-has-submenu="yes">click</a>'+
            '<ul class="j_menu_dp_container list_style_none thehide bg_white padding_15px radius_3px shadow-z-1" style="border:1px solid #ededed;margin-top:0px;">'+
                '<li class="list_style_none"><div class="display_table">'+
                    '<div class="display_row"><div class="display_cell padding_right7px"><span class="font_size10px font_500">MONTHS:</span><br>'+months+'</div><div class="display_cell padding_right7px"><span class="font_size10px font_500">DAYS:</span><br>'+days+'</div><div class="display_cell"><span class="font_size10px font_500">YEARS:</span><br>'+years+'</div></div></div>'+
                    '<div class="display_table margin_top10px"><div class="display_row"><div class="display_cell padding_right10px"><a href="#" class="btn btn-default margin_zero j_datepicker_current" style="padding:5px 8px;font-size:13px;">CURRENT DATE</a></div><div class="display_cell"><a href="#" class="btn btn-success margin_zero j_datepicker_ok" style="padding:5px 8px;font-size:13px;">OK</a></div></div></div>'+
                '</li>'+
            '</ul>'+
        '</li>'+
        '</ul></div></div>');
}