var refresh = false,curr_event = null,calendar;

$(document).ready(function(){
	calendar = $('#calendar').fullCalendar({
		customButtons: {
	        myCustomButton: {
	            text: 'Add Event',
	            click: function() {
	               notification('<strong>ADD EVENT</strong>',$("#add-event-container").html());
	               j_datepicker();
	            }
	        }
	    },
	     header: {
	        left: 'prev,next today myCustomButton',
	        center: 'title',
	        right: 'month,agendaWeek,agendaDay'
	    },
	    editable : false,
	    eventLimit: true,
	    eventClick: function(calEvent, jsEvent, view, element) {
	        notification('<strong>EDIT EVENT</strong>',$("#add-event-container").html());
	        $('#notification_dialog input[name="title"]').val(calEvent.title);
	        $('#notification_dialog input[name="start_date"]').val(moment(calEvent.start).format('MMMM DD, YYYY'));
	        $('#notification_dialog input[name="end_date"]').val(moment(calEvent.end).format('MMMM DD, YYYY'));
	        $('#notification_dialog form')
	        	.attr({ 'action' : $("body").attr("data-link")+'/calendar/events/update', 'data-onsuccess' : 'calendar_event_update', 'data-custom-message' : 'Event has been updated.' })
	        	.prepend('<input type="hidden" name="id" value="'+calEvent.id+'">');
	        $(this).addClass("event-active");
	        curr_event = calEvent;
	        $('#notification_dialog form button').text("UPDATE EVENT").addClass("margin_2px align_left").after('<button class="btn btn-danger margin_2px align_left" id="calendar-event-delete" data-id="'+calEvent.id+'">DELETE</button>');
	    },
	    eventRender: function(event, element) {
            element.attr("data-id",event.id);
            // element.find(".closeon").click(function() {
            //    $('#calendar').fullCalendar('removeEvents',event.id);
            // });
        },

    });
    //render the calendar
    get_calendar_events();
    //delete elements on click
	 $(document).on('hidden.bs.modal', '.modal', function () {
        $('.modal:visible').length && $(document.body).addClass('modal-open');
        $("body").css({ 'overflow-x' : 'hidden', 'overflow-y' : 'auto' });
        if(refresh === true){
            location.reload();
        }
        dialog_open = false;
        $(".event-active").removeClass("event-active");
    });
	$(document).on('click','#notification_dialog #calendar-event-delete',function(e){
		e.preventDefault();
		e.stopPropagation();
		$('#notification_dialog form').attr({ 'action' : $("body").attr("data-link")+'/calendar/events/delete', 'data-onsuccess' : 'calendar_event_delete', 'data-custom-message' : 'Event has been deleted.', 'data-success-function' : 'hide_pokemon' })
		$('#notification_dialog form').trigger("submit");
	});
});
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
function calendar_event_add(e){
	if(e.success){
    	 //save the event first before rendering it to the calendar
    	var event = {
			id : e.event.id,
			title : e.event.title,
			start : moment(e.event.start_date).format('YYYY-MM-DD'),
			end : moment(e.event.end_date).add(1, 'days').format('YYYY-MM-DD')
		};

		calendar.fullCalendar( 'renderEvent', event, true);
	}
}
function calendar_event_update(e){
	if(e.success){
		$.extend(curr_event, {
		    title: e.event.title,
		    start : moment(e.event.start_date).format('YYYY-MM-DD'),
			end : moment(e.event.end_date).add(1, 'days').format('YYYY-MM-DD')
		});
		calendar.fullCalendar('updateEvent', curr_event);
	}
}
function calendar_event_delete(e){
	if(e.success){
    	 //save the event first before rendering it to the calendar
		 $('#calendar').fullCalendar('removeEvents',curr_event.id)
	}
}
function get_calendar_events(e){
	$.ajax({
		url : $("body").attr("data-link")+'/calendar/events',
		type : 'post',
		dataType: 'json',
		success: function(e){
			if(e.success){
				var events = [];
				$.each(e.events,function(index,value){	
					events.push({
						id : value.id,
						title : value.title,
						start : moment(value.start_date).format('YYYY-MM-DD'),
						end : moment(value.end_date).format('YYYY-MM-DD'),
					});
				});
				calendar.fullCalendar( 'addEventSource', events);
			}
		}
	});

}