$(document).ready(function(){
	//initialize datatable
	//initialize datatatable to .dtable
    $('.dtable').each(function(){
    	$(this).DataTable({
		    buttons: ['copy', 'excel', 'pdf'],
		    "lengthMenu": [[10, 25, 50, -1],[10, 25, 50, "All"]],
		    "aaSorting": [[0,"asc"]],
		    "ordering" : [[0,"asc"]],
		     "oLanguage": {
                "oPaginate": {
                  "sPrevious": '<i class="fa fa-angle-left"></i>',
                  "sNext": '<i class="fa fa-angle-right"></i>'
                }
              }
    	});
    	$(this).find(".dt_dont_click").off("click.DT");
    });
    $(".dtable").each(function(){
        $(this).addClass("table-responsive").wrap('<div class="table-responsive"></div>');
        $(this).find(".dataTables_empty").attr("colspan",$(this).find("th").length);
    });
	$(document).on('click','#inventory-table thead .future-checkbox-ui',function(){
		if($(this).prev('.future-checkbox').is(":checked")){
			$('#inventory-table tbody tr td:first-child .future-checkbox')
			.prop("checked",true)
			.next('.future-checkbox-ui')
			.removeClass('unchecked').addClass('checked')
			.html('<i class="ion-checkmark"></i>');
			
		}else{
			$('#inventory-table tbody tr td:first-child .future-checkbox')
			.prop("checked",false)
			.next('.future-checkbox-ui')
			.removeClass('checked').addClass('unchecked')
			.html('<i class="ion-close"></i>');
		}

		if($('#inventory-table tbody input:checked').length>1){
			$("#inv-delete").prop("disabled",false);
			$("#inv-edit").prop("disabled",true);
		}else if($('#inventory-table tbody input:checked').length===1){
			$("#inv-edit").prop("disabled",false);
			$("#inv-delete").prop("disabled",false);
		}else{
			$("#inv-edit").prop("disabled",true);
			$("#inv-delete").prop("disabled",true);
		}
	});
	$(document).on('click','#inventory-table tbody .future-checkbox-ui',function(){
		if($('#inventory-table tbody input:checked').length>1){
			$("#inv-delete").prop("disabled",false);
			$("#inv-edit").prop("disabled",true);
		}else if($('#inventory-table tbody input:checked').length===1){
			$("#inv-edit").prop("disabled",false);
			$("#inv-delete").prop("disabled",false);
		}else{
			$("#inv-edit").prop("disabled",true);
			$("#inv-delete").prop("disabled",true);
		}
	});
	$(document).on('click','.add-gallery',function(){
		notification('<strong>ITEM GALLERY</strong>',$("#inventory-item-gallery-container").html());
		$("#notification_dialog .modal-body").prepend('<input type="hidden" name="id" value="'+$(this).attr("data-id")+'">');
	});
	$(document).on('click','#gallery-items-container a',function(){
		if($(this).hasClass("selected")){
			$(this).removeClass("selected")
				.css('border','none');
		}else{
			$(this).addClass("selected")
				.css('border','4px dotted #ffffff');
			
		}
		if($("#notification_dialog #gallery-items-container a.selected").length > 0){
			$("#notification_dialog #gallery-edit,#notification_dialog #gallery-delete").prop("disabled",false);
			$("#notification_dialog #edit_label").show();
		}else{
			$("#notification_dialog #edit_label").hide();
			$("#notification_dialog  #gallery-delete").prop("disabled",true);
		}
	});
	//click update button on gallery image
	$(document).on('click','#gallery-delete',function(e){
		var item_id = [];
		$("#notification_dialog #gallery-items-container a.selected").each(function(){
			item_id.push($(this).attr("data-image-name"));
		});
		var custom = '<form action="'+$("body").attr("data-link")+'/inventory/gallery/image/delete" class="ejex_form" method="post" data-type="json" data-onsuccess="gallery_delete" data-custom-message="Image/images has been successfully deleted." data-success-function="hide_pokemon"><input type="hidden" name="ids" value="'+item_id+'"><fieldset><div class="text_align_center">Are you sure you want to delete the selected image/images? click DELETE to proceed.</div></fieldset><div class="display_table center margin_top10px"><button class="btn future-button margin_zero"><div class="display_table"><div class="display_row"><div class="display_cell padding_right5px"><i class="ion-trash-b"></i></div><div class="display_cell">DELETE</div></div></div></button></div></form>';
		extra_modal('',custom);
	});
	//add new inventory
	$("#add-item").click(function(e){
		e.preventDefault();
		notification('<strong>ADD NEW ITEM</strong>',$("#inventory-container").html());
		$("#notification_dialog form").attr('data-custom-message','New item has been added');
	})
	//on click delete item
	$('#inv-delete').click(function(){
		var item_id = [];
		$("#inventory-table tbody input:checked").each(function(){
			item_id.push($(this).closest("tr").attr("data-id"));
		});
		var custom = '<form action="'+$("body").attr("data-link")+'/inventory/item-engine" class="ejex_form" method="post" data-type="json" data-onsuccess="delete_inventory" data-custom-message="Item/items has been successfully deleted." data-success-function="hide_pokemon"><input type="hidden" name="type" value="delete"><input type="hidden" name="ids" value="'+item_id+'"><fieldset><div class="text_align_center">Are you sure you want to delete the selected item/items? click DELETE to proceed.</div></fieldset><div class="display_table center margin_top10px"><button class="btn future-button margin_zero"><div class="display_table"><div class="display_row"><div class="display_cell padding_right5px"><i class="ion-trash-b"></i></div><div class="display_cell">DELETE</div></div></div></button></div></form>';
		notification('',custom);
	});
	//on click delete item
	$('#inv-edit').click(function(){
		notification('<strong>EDIT ITEM</strong>',$("#inventory-container").html());
		$("#notification_dialog form").attr( "data-custom-message" , 'Cheers! item has been updated' );
		$('#notification_dialog input[name="type"]').val("edit");
		$('#notification_dialog input[name="id"]').val($("#inventory-table tbody input:checked").closest("tr").attr("data-id"));
		$('#notification_dialog input[name="item_name"]').val($.trim($("#inventory-table tbody input:checked").closest("tr").find("td:nth-child(4)").text()));
		$('#notification_dialog textarea[name="item_description"]').text($.trim($("#inventory-table tbody input:checked").closest("tr").find("td:nth-child(5)").text()));
		$('#notification_dialog input[name="item_quantity"]').val($.trim($("#inventory-table tbody input:checked").closest("tr").find("td:nth-child(6)").text()));
	});
});
function gallery_delete(e){
	$("#notification_dialog #edit_label").hide();

	var ids = e.ids.split(',');
	$.each(ids,function(index,value){
		$('#notification_dialog #gallery-items-container a[data-image-name="'+$.trim(value)+'"]').remove();
	});
	if(!$("#notification_dialog #gallery-items-container a").length){
		$("#notification_dialog #gallery-items-container").css({ 'text-align' : 'center', 'line-height' : '100px' }).html("<span>Ops! no images yet...</span>");
	}

	$("#notification_dialog #gallery-delete").prop("disabled",true);
}
function item_gallery(e){
	if(e.success){
		notification('<strong>ITEM GALLERY</strong>',$("#inventory-item-gallery-container").html());
		if(e.images.length===0){
			$("#notification_dialog #gallery-items-container").css({ 'text-align' : 'center', 'line-height' : '100px' }).html("<span>Ops! no images yet...</span>");
		}else{
			$("#notification_dialog #gallery-items-container").css({ 'text-align' : 'initial', 'line-height' : 'normal' }).html("");
			$.each(e.images,function(index,value){
				$("#notification_dialog #gallery-items-container").append('<a href="#" data-image-name="'+value.image_name+'"><figure><img src="/inventory/gallery-images/image/'+value.image_name+'"> </figure></a>');
			});
		}

		$("#notification_dialog .modal-body").prepend('<input type="hidden" name="id" value="'+e.id+'">');

		
		init_components();
	}
}

function refresh_inventory(e){
	if(e.success){
		$("#inventory-table").dataTable().fnClearTable();
		$.each(e.items,function(index,value){
			$("#inventory-table").DataTable().row.add([
				'<input type="checkbox" name="item" class="future-checkbox">',
				value.item_id,
				'<form action="'+$("body").attr("data-link")+'/inventory/item/item-images" class="ejex_form display_table center" method="post" data-type="json" data-onsuccess="item_gallery" data-custom-message="none"><input type="hidden" name="id" value="'+value.item_id+'"><button class="btn future-button item-gallery"><div class="display_table"><div class="display_row"><div class="display_cell padding_right5px"><i class="ion-images"></i></div><div class="display_cell">VIEW IMAGES</div></div></div></button></form>',
				value.item_name,
				value.item_description,
				value.item_quantity,
				value.created_at,
				value.updated_at
			]).draw().nodes().to$().attr({ "data-id" : value.item_id });
		});
		$("#inventory-table").closest('.dataTables_wrapper').find('.dataTables_length select').val('-1').trigger("change");
		init_future();
		$("#inventory-table").closest('.dataTables_wrapper').find('.dataTables_length select').val('10').trigger("change");
		$('#inventory-table .future-checkbox')
		.prop("checked",false)
		.next('.future-checkbox-ui')
		.removeClass('checked').addClass('unchecked')
		.html('<i class="ion-close"></i>');
	}
	global_spinner_conf = true;
}

function delete_inventory(e){
	if(e.success){
        $.each(e.ids,function(i,e){
            $('#inventory-table').DataTable().row( $('#inventory-table tbody tr[data-id="'+e+'"]').closest("tr") ).remove().draw();
        });

        $("#inv-edit,#inv-delete").prop("disabled",true);
        $('#inventory-table .future-checkbox')
			.prop("checked",false)
			.next('.future-checkbox-ui')
			.removeClass('checked').addClass('unchecked')
			.html('<i class="ion-close"></i>');
    }
}
function get_items(e){
	notification('<strong>REQUEST ITEM<strong>',$("#request-item-container").html());
	$.each(e.items,function(index,value){
		$('#notification_dialog select[name="item_id"]').append('<option value="'+value.item_id+'">'+value.item_name+'</option>')
		$('#notification_dialog select[name="item_id"]').next(".future-select-ui").find('.dropdown-menu').append('<li><a href="#" class="display_block" data-value="'+value.item_id+'">'+value.item_name+'</a></li>')
	});
}

// ##################### U P L O A D ** S C R I P T #####################

function sendFileToServer(formData,status,item_edit)
{
    formData.append('id',$('#notification_dialog input[name="id"]').val());
    var uploadURL =$("body").attr("data-link")+"/inventory/gallery/image/upload"; //Upload URL
    if(item_edit!==false){
    	formData.append('item_edit',item_edit);
    }    
    var extraData ={}; //Extra Data.
    var jqXHR=$.ajax({
            xhr: function() {
            var xhrobj = $.ajaxSettings.xhr();
            if (xhrobj.upload) {
                    xhrobj.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        //Set progress
                        status.setProgress(percent);
                    }, false);
                }
            return xhrobj;
        },
    url: uploadURL,
    type: "POST",
    dataType: 'json',
    contentType:false,
    processData: false, 
        cache: false,
        data: formData,
        success: function(e){
 			if(e.success){
 				$("#notification_dialog .statusBar").remove();
 				$("#notification_dialog #edit_label").hide();
 				$("#notification_dialog #gallery-edit,#notification_dialog #gallery-delete").prop("disabled",true);
 				$("#notification_dialog #gallery-items-container").html("");
 				$.each(e.images,function(index,value){
 					$("#notification_dialog #gallery-items-container").append('<a href="#" data-image-name="'+value.image_name+'"><figure><img src="/inventory/gallery-images/image/'+value.image_name+'"> </figure></a>');
 				});
 			}else{
 				$('#notification_dialog #gallery-wrapper').prepend('<div class="font_size13px alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><i class="fa fa-times" aria-hidden="true"></i></button><table cellpadding="0" cellspacing="0" style="padding:0px;margin:0px"><tr><td class="padding_right10px" valign="middle"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></td><td class="font_size13px text_align_left">'+e.message+'</td></tr></table></div>');
 			}
        }
    });
}
 
function createStatusbar()
{
	this.progressBar = $('<div class="statusBar"><div class="progressBar"><div></div></div></div>');
    $("#notification_dialog #gallery-items-container").after(this.progressBar);
    this.setProgress = function(progress)
    {       
        var progressBarWidth =progress*this.progressBar.width()/ 100;  
        this.progressBar.find('.progressBar div').animate({ 'width' : progressBarWidth }, 10);
        if(parseInt(progress) >= 100)
        {
            this.progressBar.find('.statusBar').remove();
        }
    }
}
function handleFileUpload(files,item_edit)
{
	var status = new createStatusbar(),fd = new FormData();
   for (var i = 0; i < files.length; i++) 
   {
        fd.append('image[]', files[i]);
   }

   sendFileToServer(fd,status,item_edit);
   
}
$(document).ready(function(){
    $(document).on('drop',"#notification_dialog #gallery-wrapper", function (e) 
    {	
    	$("#notification_dialog #gallery-items-container").css({ 'text-align' : 'initial', 'line-height' : 'normal' }).find('span').remove();
        e.preventDefault();
        var files = e.originalEvent.dataTransfer.files,item_edit=false;
        if($("#notification_dialog #gallery-items-container a.selected").length===1){
        	item_edit = $("#notification_dialog #gallery-items-container a.selected").attr("data-image-name");
        }
        //We need to send dropped files to Server
        handleFileUpload(files,item_edit);
    });
    $(document).on('dragenter', "#notification_dialog #gallery-wrapper", function (e) 
    {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('dragover', function (e) 
    {
      e.stopPropagation();
      e.preventDefault();
    });
    $(document).on('drop', function (e) 
    {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on("change",'#notification_dialog input[type="file"]',function(){
       if($(this).val()!==""){
       		$("#notification_dialog #gallery-items-container").css({ 'text-align' : 'initial', 'line-height' : 'normal' }).find('span').remove();
           	var files = this.files,item_edit=false;
	        if($("#notification_dialog #gallery-items-container a.selected").length===1){
	        	item_edit = $("#notification_dialog #gallery-items-container a.selected").attr("data-image-name");
	        }
           	//We need to send dropped files to Server
           	handleFileUpload(files,item_edit);
           	$(this).val("");
       }
    });

});
