$(document).ready(function(){
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
});
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
			]).draw();
		});
		$("#inventory-table").closest('.dataTables_wrapper').find('.dataTables_length select').val('-1').trigger("change");
		init_future();
		$("#inventory-table").closest('.dataTables_wrapper').find('.dataTables_length select').val('10').trigger("change");
		$('#inventory-table .future-checkbox')
		.prop("checked",false)
		.next('.future-checkbox-ui')
		.removeClass('checked').addClass('unchecked')
		.html('<i class="ion-close"></i>');
		global_spinner_conf = true;
	}
}
function get_items(e){
	notification('<strong>REQUEST ITEM<strong>',$("#request-item-container").html());
	$.each(e.items,function(index,value){
		$('#notification_dialog select[name="item_id"]').append('<option value="'+value.item_id+'">'+value.item_name+'</option>')
		$('#notification_dialog select[name="item_id"]').next(".future-select-ui").find('.dropdown-menu').append('<li><a href="#" class="display_block" data-value="'+value.item_id+'">'+value.item_name+'</a></li>')
	});
}
