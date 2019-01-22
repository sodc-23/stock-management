$(document).ready(function(){
    $(document).on('click',".future-select-ui .dropdown-menu a",function(){
        if(!$(this).hasClass("disabled")){
            $(this).closest(".future-select-ui").find(".j_text").text($(this).text());
            $(this).closest(".future-select-ui").prev(".future-select").val($(this).attr("data-value")).trigger("change");
        }
    });
    //on click the future checkbox
    $(document).on('click','.future-checkbox-ui',function(e){
        if($(this).prev('.future-checkbox').is(":checked")){
            $(this).removeClass("checked").addClass("unchecked")
            .html('<i class="ion-close"></i>')
            .prev('input[type="checkbox"]').prop("checked",false).trigger("change");
        }else{
            $(this).removeClass('unchecked').addClass("checked")
            .html('<i class="ion-checkmark"></i>')
            .prev('input[type="checkbox"]').prop("checked",true).trigger("change")
            
        }
    });
    //on click the future radio
    $(document).on('click','.future-radio-ui',function(){
        $(this).closest('.future-radio').find('.future-radio-ui').removeClass('checked');
        if($(this).hasClass("checked")){
            $(this).addClass("unchecked");
            $(this).prev('input[type="radio"]').prop("checked",false).trigger("change");
        }else{
            $(this).addClass("checked");
            $(this).prev('input[type="radio"]').prop("checked",true).trigger("change");
        }
    });
    //load the future init function
    init_future();
});

function init_future(){
    $('.future-select').each(function(){
        if(!$(this).next(".future-select-ui").length){
            var future_select_ui_contents = "",float_class;
            $(this).find("option").each(function(){
                var disabled='';
                if($(this).is(":disabled")){
                    disabled = ' disabled';
                }
                future_select_ui_contents += '<li><a href="#" class="display_block'+disabled+'" data-value="'+$(this).attr("value")+'">'+$(this).text()+'</a></li>';
            });
            $(this).hide();
            if($(this).attr("data-float")==="right"){
                float_class = "pull-right";
            }else{
                float_class = "pull-left";
            }
            $(this).after('<div class="btn-group future-select-ui"><button class="btn btn-sm dropdown-toggle future-select-ui-container" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <div class="display_table"> <div class="display_row"> <div class="display_cell padding_right7px j_text">'+$(this).find('option:selected').text()+'</div><div class="display_cell vertical_align_middle" style="width:5px;"><i class="ion-android-arrow-dropdown"></i> </div></div></div></button> <ul class="dropdown-menu '+float_class+' shadow-z-1">'+future_select_ui_contents+'</ul></div>');
        }
    });
    //make a custom checkbox
    $(".future-checkbox").hide().each(function(){
        if(!$(this).next(".future-checkbox-ui").length){
            var state = 'unchecked',state_icon = '<i class="ion-close"></i>';
            if($(this).is(":checked")){
                state = "checked";
                state_icon = '<i class="ion-checkmark"></i>';
            }
            $(this).after('<a href="#" class="future-checkbox-ui '+state+'" style="margin:2px;">'+state_icon+'</a>');
        }
    });
    //make a custom radio
    $('.future-radio').find('input[type="radio"]').hide().each(function(){
        if(!$(this).next(".future-radio-ui").length){
            var state = 'unchecked';
            if($(this).is(":checked")){
                state = "checked";
            }
            $(this).after('<a href="#" class="future-radio-ui '+state+'" style="margin:2px;"><div></div></a>');
        }
    });
}