<div class="display_table full_width margin_bottom7px">
	<div class="display_table align_left">
		<button class="margin_2px btn future-button display_block align_left" id="message-delete" data-toggle="tooltip" title="Delete" disabled>
			<i class="ion-trash-b"></i>
		</button>
	</div>
	<div class="display_table align_right j_menu">
		<form action="{{ url('/reporting/messages/reload') }}" class="ejex_form display_block align_left margin_2px" method="post" data-type="json" data-onsuccess="refresh_messages" data-custom-message="none" id="reload-messages">
			<button class="btn future-button">
				<div class="display_table">
					<div class="display_row">
						<div class="display_cell padding_right5px">
							<i class="fa fa-refresh"></i>
						</div>
						<div class="display_cell">Reload Messages</div>
					</div>
				</div>
			</button>
		</form>
		<ul class="j_menu_nav menu padding_zero display_block margin_2px align_left">
			<li>
				<a href="#" class="btn future-button j_parent" data-has-submenu="yes">
					<div class="display_table">
					    <div class="display_row">
					        <div class="display_cell padding_right7px j_text">Date Filter</div>
					        <div class="display_cell vertical_align_middle" style="width:5px;"><i class="ion-android-arrow-dropdown"></i> </div>
					    </div>
					</div>
				</a>
				<ul class="j_menu_dp_container font_size13px padding_15px" style="margin-top:5px;right:0px;">
					<li>
						<form action="{{ url('/reporting/messages/data-filter') }}" class="ejex_form" method="post" data-type="json" data-onsuccess="refresh_request" data-custom-message="none">
							<div class="form-group">
								<label>FROM</label>
								<input type="text" class="form-control future-input datepicker" name="from" style="width:150px;">
							</div>
							<div class="form-group">
								<label>TO</label>
								<input type="text" class="form-control future-input datepicker" name="to" style="width:150px;">
							</div>
							<div class="display_table center margin_top10px">
								<button class="btn future-button">Filter</button>
							</div>
						</form>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</div>
<div class="table-responsive">
	<table class="dtable table table-responsive table_all_center font_size13px future-table table_vertical_align_middle" id="messages-table">
		<thead>
			<tr>
				<th class="dt_dont_click">
					<input type="checkbox" name="checkall" class="future-checkbox">
				</th>
				<th>SENDER</th>
				<th>MESSAGES</th>
				<th>SENT DATE</th>
			</tr>
		</thead>
		<tbody>
			@foreach($messages as $i)
			<tr data-id="{{ $i->id }}" data-status="unread">
				<td>
					<input type="checkbox" name="item" class="future-checkbox">
				</td>
				<td>{{ $i->name }}</td>
				<td>
					<div class="display_table center">
						<form action="{{ url('/reporting/messages/read') }}" class="ejex_form" method="post" data-type="json" data-onsuccess="read_message" data-custom-message="none">
							<input type="hidden" name="id" value="{{ $i->id }}">
							<button class="btn future-button view-message" data-message="{{ $i->messages }}" data-toggle="tooltip" title="Click to view the message">View Message</button>	
						</form>
						
					</div>
				</td>
				<td>{{ $i->created_at }}</td>
			</tr>
			@endforeach
			@foreach($history_messages as $i)
			<tr data-id="{{ $i->id }}" data-status="read">
				<td>
					<input type="checkbox" name="item" class="future-checkbox">
				</td>
				<td>{{ $i->name }}</td>
				<td>
					<div class="display_table center">
						<button class="btn future-button view-message" data-message="{{ $i->messages }}" data-toggle="tooltip" title="Click to view the message">View Message</button>
					</div>
				</td>
				<td>{{ $i->created_at }}</td>
			</tr>
			@endforeach
		</tbody>
	</table>
</div>




