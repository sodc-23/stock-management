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
	$(document).on('click','#reporting-table thead .future-checkbox-ui',function(){
		if($(this).prev('.future-checkbox').is(":checked")){
			$('#reporting-table tbody tr td:first-child .future-checkbox')
			.prop("checked",true)
			.next('.future-checkbox-ui')
			.removeClass('unchecked').addClass('checked')
			.html('<i class="ion-checkmark"></i>');
			
		}else{
			$('#reporting-table tbody tr td:first-child .future-checkbox')
			.prop("checked",false)
			.next('.future-checkbox-ui')
			.removeClass('checked').addClass('unchecked')
			.html('<i class="ion-close"></i>');
		}

		if($('#reporting-table tbody input:checked').length){
            $("#rep-delete").prop("disabled",false);
            if($('#reporting-table tbody input:checked').closest('tr[data-status="pending"]').length){
                $("#rep-approve,#rep-reject").prop("disabled",false);
            }else{
                $("#rep-approve,#rep-reject").prop("disabled",true);
            }
        }else{
            $("#rep-delete,#rep-approve,#rep-reject").prop("disabled",true);
        }
	});
	$(document).on('click','#reporting-table tbody .future-checkbox-ui',function(){
		if($('#reporting-table tbody input:checked').length){
			$("#rep-delete").prop("disabled",false);
            if($('#reporting-table tbody input:checked').closest('tr[data-status="pending"]').length){
                $("#rep-approve,#rep-reject").prop("disabled",false);
            }else{
                $("#rep-approve,#rep-reject").prop("disabled",true);
            }
		}else{
			$("#rep-delete,#rep-approve,#rep-reject").prop("disabled",true);
		}
	});

	//on click delete item
	$('#rep-delete').click(function(){
		var item_id = [];
		$("#reporting-table tbody input:checked").each(function(){
			item_id.push($.trim($(this).closest("tr").attr("data-id")));
		});
		var custom = '<form action="'+$("body").attr("data-link")+'/reporting/request-table/delete" class="ejex_form" method="post" data-type="json" data-onsuccess="request_delete" data-custom-message="Item/items has been successfully deleted." data-success-function="hide_pokemon"><input type="hidden" name="ids" value="'+item_id+'"><fieldset><div class="text_align_center">Are you sure you want to delete the selected requested item/items? click DELETE to proceed.</div></fieldset><div class="display_table center margin_top10px"><button class="btn future-button margin_zero"><div class="display_table"><div class="display_row"><div class="display_cell padding_right5px"><i class="ion-trash-b"></i></div><div class="display_cell">DELETE</div></div></div></button></div></form>';
		notification('',custom);
	});
    //on click approve item
    $('#rep-approve').click(function(){
        var item_id = [];
        $("#reporting-table tbody input:checked").closest('tr[data-status="pending"]').each(function(){
            item_id.push($.trim($(this).attr("data-id")));
        });
        var custom = '<form action="'+$("body").attr("data-link")+'/reporting/request-table/approve" class="ejex_form" method="post" data-type="json" data-onsuccess="request_approve" data-custom-message="Item/items has been approved by you." data-success-function="hide_pokemon"><input type="hidden" name="ids" value="'+item_id+'"><fieldset><div class="text_align_center">Are you sure you want to approve the selected requested item/items?.</div></fieldset><div class="display_table center margin_top10px"><button class="btn future-button margin_zero"><div class="display_table"><div class="display_row"><div class="display_cell padding_right5px"><i class="ion-checkmark"></i></div><div class="display_cell">APPROVE</div></div></div></button></div></form>';
        notification('',custom);
    });
    //on click reject item
    $('#rep-reject').click(function(){
        var item_id = [];
        $("#reporting-table tbody input:checked").closest('tr[data-status="pending"]').each(function(){
            item_id.push($.trim($(this).attr("data-id")));
        });
        var custom = '<form action="'+$("body").attr("data-link")+'/reporting/request-table/reject" class="ejex_form" method="post" data-type="json" data-onsuccess="request_delete" data-custom-message="Item/items has been rejected by you." data-success-function="hide_pokemon"><input type="hidden" name="ids" value="'+item_id+'"><fieldset><div class="text_align_center">Are you sure you want to reject the selected requested item/items?.</div></fieldset><div class="display_table center margin_top10px"><button class="btn future-button margin_zero"><div class="display_table"><div class="display_row"><div class="display_cell padding_right5px"><i class="ion-close"></i></div><div class="display_cell">REJECT</div></div></div></button></div></form>';
        notification('',custom);
    });

    //MESSAGES
    $(document).on('click','#messages-table thead .future-checkbox-ui',function(){
        if($(this).prev('.future-checkbox').is(":checked")){
            $('#messages-table tbody tr td:first-child .future-checkbox')
            .prop("checked",true)
            .next('.future-checkbox-ui')
            .removeClass('unchecked').addClass('checked')
            .html('<i class="ion-checkmark"></i>');
            
        }else{
            $('#messages-table tbody tr td:first-child .future-checkbox')
            .prop("checked",false)
            .next('.future-checkbox-ui')
            .removeClass('checked').addClass('unchecked')
            .html('<i class="ion-close"></i>');
        }

        if($('#messages-table tbody input:checked').length){
            $("#message-delete").prop("disabled",false);
        }else{
            $("#message-delete").prop("disabled",true);
        }
    });
    $(document).on('click','#messages-table tbody .future-checkbox-ui',function(){
        if($('#messages-table tbody input:checked').length){
            $("#message-delete").prop("disabled",false);
        }else{
            $("#message-delete").prop("disabled",true);
        }
    });

    $(document).on("click",'#messages-table tr[data-status="read"] .view-message',function(){
        notification('MESSAGE',$(this).attr("data-message"));
    });

    //on click delete item
    $('#message-delete').click(function(){
        var item_id = [];
        $("#messages-table tbody input:checked").each(function(){
            item_id.push($.trim($(this).closest("tr").attr("data-id")));
        });
        var custom = '<form action="'+$("body").attr("data-link")+'/reporting/message-table/delete" class="ejex_form" method="post" data-type="json" data-onsuccess="message_delete" data-custom-message="message(s) has been successfully deleted." data-success-function="hide_pokemon"><input type="hidden" name="ids" value="'+item_id+'"><fieldset><div class="text_align_center">Are you sure you want to delete the selected message(s)? click DELETE to proceed.</div></fieldset><div class="display_table center margin_top10px"><button class="btn future-button margin_zero"><div class="display_table"><div class="display_row"><div class="display_cell padding_right5px"><i class="ion-trash-b"></i></div><div class="display_cell">DELETE</div></div></div></button></div></form>';
        notification('',custom);
    });
});

$(window).resize(function(){
   chart_size();
});
function chart_size(){
    $(".chart").each(function(){
       $(this).addClass('center').css('width',$(this).closest(".perent").width() + 'px');
       $(this).find(".highcharts-container").addClass('center').css('width',$(this).closest(".perent").width() + 'px');
    });
    
}
function refresh_request(e){
    if(e.success){
        $("#reporting-table").dataTable().fnClearTable();
        $.each(e.pending_items,function(index,value){
            $("#reporting-table").DataTable().row.add([
                '<input type="checkbox" name="item" class="future-checkbox">',
                value.item_id,
                value.item_name,
                value.item_quantity,
                '<i class="ion-android-time" data-toggle="tooltip" title="Pending"></i>',
                value.name,
                value.created_at,
            ]).draw().nodes().to$().attr({ "data-id" : value.id, 'data-status' : 'pending' });
        });
        $.each(e.history_items,function(index,value){
            $("#reporting-table").DataTable().row.add([
                '<input type="checkbox" name="item" class="future-checkbox">',
                value.item_id,
                value.item_name,
                value.item_quantity,
                '<i class="ion-checkmark" data-toggle="tooltip" title="Approve"></i>',
                value.name,
                value.created_at,
            ]).draw().nodes().to$().attr({ "data-id" : value.id, 'data-status' : 'approve' });
        });
        $("#reporting-table").closest('.dataTables_wrapper').find('.dataTables_length select').val('-1').trigger("change");
        init_future();
        $("#reporting-table").closest('.dataTables_wrapper').find('.dataTables_length select').val('10').trigger("change");
    }
    $('#reporting-table .future-checkbox')
        .prop("checked",false)
        .next('.future-checkbox-ui')
        .removeClass('checked').addClass('unchecked')
        .html('<i class="ion-close"></i>');

     $('#reporting-table [data-toggle="tooltip"]').tooltip();

     global_spinner_conf = true;
}

function reporting_inventory_tab(){
    var jan=0,feb=0,mar=0,apr=0,may=0,jun=0,jul=0,aug=0,sep=0,oct=0,nov=0,dec=0;
    //get the request items data
    $.ajax({
        url: $("body").attr("data-link")+'/reporting/graph',
        type: 'post',
        dataType: 'json',
        beforeSend:function(){j_loading('on','white','yes')},
        complete:function(){j_loading('off','white','no');},
        success:function(e){
            //in stock array
            $.each(e.in_stock_array,function(index,value){
                switch(moment(value.created_at).format('MMM').toLowerCase()){
                    case "jan":
                        jan=+1;
                        break;
                    case "feb":
                        feb=+1;
                        break;
                    case "apr":
                        apr=+1;
                        break;
                    case "may":
                        may=+1;
                        break;
                    case "jun":
                        jun=+1;
                        break;
                    case "jul":
                        jul=+1;
                        break;
                    case "aug":
                        aug=+1;
                        break;
                    case "sep":
                        sep=+1;
                        break;
                    case "oct":
                        oct=+1;
                        break;
                    case "nov":
                        nov=+1;
                        break;
                    case "dec":
                        dec=+1;
                        break;
                }
            });
            var in_stock_array=[jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec];
            jan=0,feb=0,mar=0,apr=0,may=0,jun=0,jul=0,aug=0,sep=0,oct=0,nov=0,dec=0;

            //out of stock array
            $.each(e.out_of_stock_array,function(index,value){
                switch(moment(value.created_at).format('MMM').toLowerCase()){
                    case "jan":
                        jan=+1;
                        break;
                    case "feb":
                        feb=+1;
                        break;
                    case "apr":
                        apr=+1;
                        break;
                    case "may":
                        may=+1;
                        break;
                    case "jun":
                        jun=+1;
                        break;
                    case "jul":
                        jul=+1;
                        break;
                    case "aug":
                        aug=+1;
                        break;
                    case "sep":
                        sep=+1;
                        break;
                    case "oct":
                        oct=+1;
                        break;
                    case "nov":
                        nov=+1;
                        break;
                    case "dec":
                        dec=+1;
                        break;
                }
            });
            var out_of_stock_array=[jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec];
            jan=0,feb=0,mar=0,apr=0,may=0,jun=0,jul=0,aug=0,sep=0,oct=0,nov=0,dec=0;

            //requested items array
            $.each(e.requested_items_array,function(index,value){
                switch(moment(value.created_at).format('MMM').toLowerCase()){
                    case "jan":
                        jan=+1;
                        break;
                    case "feb":
                        feb=+1;
                        break;
                    case "apr":
                        apr=+1;
                        break;
                    case "may":
                        may=+1;
                        break;
                    case "jun":
                        jun=+1;
                        break;
                    case "jul":
                        jul=+1;
                        break;
                    case "aug":
                        aug=+1;
                        break;
                    case "sep":
                        sep=+1;
                        break;
                    case "oct":
                        oct=+1;
                        break;
                    case "nov":
                        nov=+1;
                        break;
                    case "dec":
                        dec=+1;
                        break;
                }
            });
            var requested_items_array=[jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec];
            jan=0,feb=0,mar=0,apr=0,may=0,jun=0,jul=0,aug=0,sep=0,oct=0,nov=0,dec=0;

            //all items created in this year
            $.each(e.all_items,function(index,value){
                switch(moment(value.created_at).format('MMM').toLowerCase()){
                    case "jan":
                        jan=+1;
                        break;
                    case "feb":
                        feb=+1;
                        break;
                    case "apr":
                        apr=+1;
                        break;
                    case "may":
                        may=+1;
                        break;
                    case "jun":
                        jun=+1;
                        break;
                    case "jul":
                        jul=+1;
                        break;
                    case "aug":
                        aug=+1;
                        break;
                    case "sep":
                        sep=+1;
                        break;
                    case "oct":
                        oct=+1;
                        break;
                    case "nov":
                        nov=+1;
                        break;
                    case "dec":
                        dec=+1;
                        break;
                }
            });
            var all_items=[jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec];
            jan=0,feb=0,mar=0,apr=0,may=0,jun=0,jul=0,aug=0,sep=0,oct=0,nov=0,dec=0;
            
            
            
            $('#inventory-request-chart').highcharts({
                 chart: {
                    borderColor: '#ff0000',
                    width: $(this).closest(".perent").width(),
                    height: 300
                },
                title: {
                    text: false,
                    x: -20 //center
                },
                subtitle: {
                    text: false,
                    x: -20
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: false
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    shared: true,
                    crosshairs: true
                },
                exporting: {
                    buttons: {
                        contextButton: {
                            theme: {
                                zIndex: 100   
                            }
                        }
                    }

                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                    borderWidth: 0,
                    x : 0,
                    y: 0
                },
                series: [{
                    name: 'In Stock',
                    data: in_stock_array
                }, {
                    name: 'Out of Stock',
                    data: out_of_stock_array
                }, {
                    name: 'Request items',
                    data: requested_items_array
                }, {
                    name: 'All Items',
                    data: all_items
                }]
            });
            chart_size();    
        }
    });
}

function refresh_reporting_graph(e){
     var jan=0,feb=0,mar=0,apr=0,may=0,jun=0,jul=0,aug=0,sep=0,oct=0,nov=0,dec=0;
    //in stock array
    $.each(e.in_stock_array,function(index,value){
        switch(moment(value.created_at).format('MMM').toLowerCase()){
            case "jan":
                jan=+1;
                break;
            case "feb":
                feb=+1;
                break;
            case "apr":
                apr=+1;
                break;
            case "may":
                may=+1;
                break;
            case "jun":
                jun=+1;
                break;
            case "jul":
                jul=+1;
                break;
            case "aug":
                aug=+1;
                break;
            case "sep":
                sep=+1;
                break;
            case "oct":
                oct=+1;
                break;
            case "nov":
                nov=+1;
                break;
            case "dec":
                dec=+1;
                break;
        }
    });
    var in_stock_array=[jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec];
    jan=0,feb=0,mar=0,apr=0,may=0,jun=0,jul=0,aug=0,sep=0,oct=0,nov=0,dec=0;

    //out of stock array
    $.each(e.out_of_stock_array,function(index,value){
        switch(moment(value.created_at).format('MMM').toLowerCase()){
            case "jan":
                jan=+1;
                break;
            case "feb":
                feb=+1;
                break;
            case "apr":
                apr=+1;
                break;
            case "may":
                may=+1;
                break;
            case "jun":
                jun=+1;
                break;
            case "jul":
                jul=+1;
                break;
            case "aug":
                aug=+1;
                break;
            case "sep":
                sep=+1;
                break;
            case "oct":
                oct=+1;
                break;
            case "nov":
                nov=+1;
                break;
            case "dec":
                dec=+1;
                break;
        }
    });
    var out_of_stock_array=[jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec];
    jan=0,feb=0,mar=0,apr=0,may=0,jun=0,jul=0,aug=0,sep=0,oct=0,nov=0,dec=0;

    //requested items array
    $.each(e.requested_items_array,function(index,value){
        switch(moment(value.created_at).format('MMM').toLowerCase()){
            case "jan":
                jan=+1;
                break;
            case "feb":
                feb=+1;
                break;
            case "apr":
                apr=+1;
                break;
            case "may":
                may=+1;
                break;
            case "jun":
                jun=+1;
                break;
            case "jul":
                jul=+1;
                break;
            case "aug":
                aug=+1;
                break;
            case "sep":
                sep=+1;
                break;
            case "oct":
                oct=+1;
                break;
            case "nov":
                nov=+1;
                break;
            case "dec":
                dec=+1;
                break;
        }
    });
    var requested_items_array=[jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec];
    jan=0,feb=0,mar=0,apr=0,may=0,jun=0,jul=0,aug=0,sep=0,oct=0,nov=0,dec=0;

    //all items created in this year
    $.each(e.all_items,function(index,value){
        switch(moment(value.created_at).format('MMM').toLowerCase()){
            case "jan":
                jan=+1;
                break;
            case "feb":
                feb=+1;
                break;
            case "apr":
                apr=+1;
                break;
            case "may":
                may=+1;
                break;
            case "jun":
                jun=+1;
                break;
            case "jul":
                jul=+1;
                break;
            case "aug":
                aug=+1;
                break;
            case "sep":
                sep=+1;
                break;
            case "oct":
                oct=+1;
                break;
            case "nov":
                nov=+1;
                break;
            case "dec":
                dec=+1;
                break;
        }
    });
    var all_items=[jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec];
    jan=0,feb=0,mar=0,apr=0,may=0,jun=0,jul=0,aug=0,sep=0,oct=0,nov=0,dec=0;
    
    
    
    $('#inventory-request-chart').highcharts({
         chart: {
            borderColor: '#ff0000',
            width: $(this).closest(".perent").width(),
            height: 300
        },
        title: {
            text: false,
            x: -20 //center
        },
        subtitle: {
            text: false,
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: false
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            shared: true,
            crosshairs: true
        },
        exporting: {
            buttons: {
                contextButton: {
                    theme: {
                        zIndex: 100   
                    }
                }
            }

        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0,
            x : 0,
            y: 0
        },
        series: [{
            name: 'In Stock',
            data: in_stock_array
        }, {
            name: 'Out of Stock',
            data: out_of_stock_array
        }, {
            name: 'Request items',
            data: requested_items_array
        }, {
            name: 'All Items',
            data: all_items
        }]
    });
    chart_size();
}

function render_graph_title(){
    $("#graph_title").text("Graph "+$('#graph-data-filter input[name="from"]').val()+" - "+$('#graph-data-filter input[name="to"]').val());
}
function request_delete(e){
    if(e.success){
        $.each(e.ids,function(i,e){
            $('#reporting-table').DataTable().row( $('#reporting-table tbody tr[data-id="'+e+'"]').closest("tr") ).remove().draw();
        });

        $("#rep-delete,#rep-approve,#rep-reject").prop("disabled",true);
        $('#reporting-table .future-checkbox')
            .prop("checked",false)
            .next('.future-checkbox-ui')
            .removeClass('checked').addClass('unchecked')
            .html('<i class="ion-close"></i>');
        //$("#reporting-table").closest(".dataTables_wrapper").find(".dataTables_length select").val(10).trigger("change");
    }
}
function request_approve(e){
    if(e.success){
        $.each(e.ids,function(i,e){
            $('#reporting-table tbody tr[data-id="'+e+'"]').find('td:nth-child(5)').html('<i class="ion-checkmark" data-toggle="tooltip" title="Approve"></i>')
                .closest("tr").appendTo($('#reporting-table tbody'));
        });
        $('#reporting-table [data-toggle="tooltip"]').tooltip();

        $("#rep-delete,#rep-approve,#rep-reject").prop("disabled",true);
        //uncheck all checkboxes
        $('#reporting-table tbody .future-checkbox')
            .prop("checked",false)
            .next('.future-checkbox-ui')
            .removeClass('checked').addClass('unchecked')
            .html('<i class="ion-close"></i>');
    }
}
//MESSAGES -------------------------------------------------------------------------
//reload messages
function refresh_messages(e){
    if(e.success){
        $("#messages-table").dataTable().fnClearTable();
        $.each(e.messages,function(index,value){
            $("#messages-table").DataTable().row.add([
                '<input type="checkbox" name="item" class="future-checkbox">',
                value.name,
                '<div class="display_table center"><form action="'+$("body").attr("data-link")+'/reporting/messages/read" class="ejex_form" method="post" data-type="json" data-onsuccess="read_message" data-custom-message="none"><input type="hidden" name="id" value="'+value.id+'"><button class="btn future-button view-message" data-message="'+value.messages+'" data-toggle="tooltip" title="Click to view the message">View Message</button></form></div>',
                value.created_at,
            ]).draw().nodes().to$().attr({ "data-id" : value.id, 'data-status' : 'unread' });
        });
        $.each(e.history_messages,function(index,value){
            $("#messages-table").DataTable().row.add([
                '<input type="checkbox" name="item" class="future-checkbox">',
                value.name,
                '<div class="display_table center"><button class="btn future-button view-message" data-message="'+value.messages+'" data-toggle="tooltip" title="Click to view the message">View Message</button></div>',
                value.created_at,
            ]).draw().nodes().to$().attr({ "data-id" : value.id, 'data-status' : 'read' });
        });

        $("#messages-table").closest('.dataTables_wrapper').find('.dataTables_length select').val('-1').trigger("change");
        init_future();
        var messages_counter = $('#messages-table tr[data-status="unread"]').length;
        $("#messages-table").closest('.dataTables_wrapper').find('.dataTables_length select').val('10').trigger("change");
        $("#messages-counter-badge").text(messages_counter);

         $('#messages-table .future-checkbox')
        .prop("checked",false)
        .next('.future-checkbox-ui')
        .removeClass('checked').addClass('unchecked')
        .html('<i class="ion-close"></i>');

        $('#messages-table [data-toggle="tooltip"]').tooltip();
    }
    global_spinner_conf = true;
}
//read message
function read_message(e){
    if(e.success){
        notification('MESSAGE',$('#messages-table tbody tr[data-id="'+e.id+'"] .view-message').attr("data-message"));
        $('#messages-table tbody tr[data-id="'+e.id+'"]').attr("data-status",'read').appendTo($('#messages-table tbody'));
        $('#messages-table tbody tr[data-id="'+e.id+'"] .view-message').unwrap('form').prev('input[name="id"]').remove();
        check_message();
    }

}

//check messages e.g. 'unread messages'
function check_message(){
    $("#messages-table").closest('.dataTables_wrapper').find('.dataTables_length select').val('-1').trigger("change");
    var messages_counter = $('#messages-table tr[data-status="unread"]').length;
    //re-insert the unread messages on the top of the row
    $('#messages-table tbody tr[data-status="unread"]').prependTo($('#messages-table tbody'));
    $("#messages-table").closest('.dataTables_wrapper').find('.dataTables_length select').val('10').trigger("change");
    $("#messages-counter-badge").text(messages_counter);
}

function message_delete(e){
    if(e.success){
        $.each(e.ids,function(i,e){
            $('#messages-table').DataTable().row( $('#messages-table tbody tr[data-id="'+e+'"]').closest("tr") ).remove().draw();
        });

        $("#messages-table").closest('.dataTables_wrapper').find('.dataTables_length select').val('-1').trigger("change");
        var messages_counter = $('#messages-table tr[data-status="unread"]').length;
        $("#messages-table").closest('.dataTables_wrapper').find('.dataTables_length select').val('10').trigger("change");
        $("#messages-counter-badge").text(messages_counter);

        $("#message-delete").prop("disabled",true);
        $('#messages-table .future-checkbox')
            .prop("checked",false)
            .next('.future-checkbox-ui')
            .removeClass('checked').addClass('unchecked')
            .html('<i class="ion-close"></i>');
        //$("#reporting-table").closest(".dataTables_wrapper").find(".dataTables_length select").val(10).trigger("change");
    }
}