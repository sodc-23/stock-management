$(document).ready(function(){

	$('.dynamic-input-label:not([data-identity="password"]):not([data-identity="role"]):not([data-identity="age"]):not([data-identity="marital status"])').each(function(){
		$(this).after('<div class="dynamic-input thehide shadow-z-1"> <div class="display_table"> <div class="display_row"> <div class="display_cell padding_right7px"> <input type="text" class="form-control future-input dynamic-input-input" style="width:150px;" name="'+$(this).attr("data-identity").toLowerCase().replace(' ','_')+'"> </div><div class="display_cell padding_right2px"><a href="#" class="dynamic-input-save" data-toggle="tooltip" title="Save"><i class="ion-checkmark" style="font-size:15px;"></i></a></div><div class="display_cell"><a href="#" class="dynamic-input-close" data-toggle="tooltip" title="Cancel"><i class="ion-close" style="font-size:15px;"></i></a></div></div></div></div>');
	})
	$('.dynamic-input-label[data-identity="password"]').each(function(){
		$(this).after('<div class="dynamic-input thehide shadow-z-1"> <div class="display_table full_width"> <div class="display_row"> <div class="display_cell padding_right7px"> <label class="font_size11px margin_bottom3px">NEW PASSWORD <span class="font_size9px">(must be unique)</span></label> <input type="text" class="form-control future-input dynamic-input-input" name="password"> <label class="font_size11px margin_bottom3px">CONFIRM PASSWORD</label> <input type="text" class="form-control future-input" name="confirm_password"> </div></div></div><div class="display_table center margin_top10px"> <div class="display_row"> <div class="display_cell padding_right5px"><a href="#" class="dynamic-input-save" data-toggle="tooltip" title="Save"><i class="ion-checkmark" style="font-size:15px;"></i></a></div><div class="display_cell"><a href="#" class="dynamic-input-close" data-toggle="tooltip" title="Cancel"><i class="ion-close" style="font-size:15px;"></i></a></div></div></div></div>');
	})
	$('.dynamic-input-label[data-identity="role"]').each(function(){
		var this_current = $(this);
		$(this).after('<div class="dynamic-input thehide shadow-z-1"> <div class="display_table"> <div class="display_row"> <div class="display_cell padding_right7px">'+$("#role-list").html()+'</div><div class="display_cell padding_right2px"><a href="#" class="dynamic-input-save" data-toggle="tooltip" title="Save"><i class="ion-checkmark" style="font-size:15px;"></i></a></div><div class="display_cell"><a href="#" class="dynamic-input-close" data-toggle="tooltip" title="Cancel"><i class="ion-close" style="font-size:15px;"></i></a></div></div></div></div>');
	})
	$(document).on("click",".dynamic-input-label",function(){
		if($(this).closest(".perent").find(".dynamic-input").is(":visible")){
			$(this).closest(".perent").find(".dynamic-input").fadeOut(200);
		}else{
			$(this).closest(".perent").find(".dynamic-input").fadeIn(200).find('.dynamic-input-input').val($(this).text());
			$('[data-toggle="tooltip"]').tooltip();
		}
	})
	//when show password checkbox is checked
	$(document).on('change','#notification_dialog input[name="show_password"]',function(){
		if($(this).is(":checked")){
			$('#notification_dialog input[name="password"],#notification_dialog input[name="c_password"]').attr("type","text");
		}else{
			$('#notification_dialog input[name="password"],#notification_dialog input[name="c_password"]').attr("type","password");
		}

	});
	//edit profile click
	$(document).on('click','#edit-profile',function(e){
		e.preventDefault();
		notification('<strong>EDIT PROFILE</strong>',$("#profile-container").html());
		$('#notification_dialog form').attr({ "data-onsuccess" : "edit_profile", 'data-custom-message' : 'Cheers! profile has been updated' });
		$('#notification_dialog input[name="type"]').val('edit');
		$('#notification_dialog input[name="id"]').val($.trim($('#profile [data-identity="username"]').text()));
		$('#notification_dialog input[name="username"]').val($.trim($('#profile [data-identity="username"]').text()));
		$('#notification_dialog input[name="password"],#notification_dialog input[name="c_password"]').attr("required",false);
		$('#notification_dialog select[name="role"]').next('.future-select-ui').find(".dropdown-menu li a:contains('"+$.trim($('#profile [data-identity="role"]').text())+"')").trigger("click");
		$('#notification_dialog input[name="fullname"]').val($.trim($('#profile [data-identity="fullname"]').text()));
		$('#notification_dialog select[name="age"]').next('.future-select-ui').find(".dropdown-menu li a:contains('"+$.trim($('#profile [data-identity="age"]').text())+"')").trigger("click");
		$('#notification_dialog input[name="address"]').val($.trim($('#profile [data-identity="address"]').text()));
		$('#notification_dialog select[name="marital_status"]').next('.future-select-ui').find(".dropdown-menu li a:contains('"+$.trim($('#profile [data-identity="marital_status"]').text())+"')").trigger("click");
		$('#notification_dialog input[name="email"]').val($.trim($('#profile [data-identity="email"]').text()));
	});
});
function profile(e){
	if(e.success){
		if(e.user.img){
			$("#profile-image-container").html('<img src="data:image/jpeg;base64,'+e.user.img+'" class="radius_circle bg_gray" style="width:100px;height:100px;display:block;">');
		}else{
			$("#profile-image-container").html('<div class="radius_circle bg_gray text_align_center" style="width:100px;height:100px;line-height:100px;display:block;"><i class="ion-person" style="font-size:60px;"></i></div>');
		}
		$('#profile [data-identity="username"]').text(e.user.username);
		$('#profile [data-identity="role"]').text(e.user.role);
		$('#profile [data-identity="password"]').text(e.user.password);
		$('#profile [data-identity="fullname"]').text(e.user.fullname);
		$('#profile [data-identity="age"]').text(e.user.age);
		$('#profile [data-identity="address"]').text(e.user.address);
		$('#profile [data-identity="marital status"]').text(e.user.marital_status);
		$('#profile [data-identity="email"]').text(e.user.email);
	}
}

function edit_profile(e){
	if(e.success){
		$("#select-employee-profile option:not(:first-child)").remove();
		$("#select-employee-profile").next('.future-select-ui').find('.dropdown-menu li:not(:first-child)').remove();
		$.each(e.users,function(index,value){
			$("#select-employee-profile").append('<option value="'+value.username+'">'+value.fullname+'</option>');
			$('#select-employee-profile').next('.future-select-ui').find('.dropdown-menu').append('<li><a href="#" class="display_block" data-value="'+value.username+'">'+value.fullname+'</a></li>');
		});

		if(e.user.img){
			$("#profile-image-container").html('<img src="data:image/jpeg;base64,'+e.user.img+'" class="radius_circle bg_gray" style="width:100px;height:100px;display:block;">');
		}else{
			$("#profile-image-container").html('<div class="radius_circle bg_gray text_align_center" style="width:100px;height:100px;line-height:100px;display:block;"><i class="ion-person" style="font-size:60px;"></i></div>');
		}
		$('#profile [data-identity="username"]').text(e.user.username);
		$('#profile [data-identity="role"]').text(e.user.role);
		$('#profile [data-identity="password"]').text(e.user.password);
		$('#profile [data-identity="fullname"]').text(e.user.fullname);
		$('#profile [data-identity="age"]').text(e.user.age);
		$('#profile [data-identity="address"]').text(e.user.address);
		$('#profile [data-identity="marital status"]').text(e.user.marital_status);
		$('#profile [data-identity="email"]').text(e.user.email);
	}
}