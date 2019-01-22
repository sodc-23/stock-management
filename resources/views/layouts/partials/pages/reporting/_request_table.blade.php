<div class="display_table full_width margin_bottom7px">
	<div class="display_table align_left">
		<button class="margin_2px btn future-button display_block align_left" id="rep-delete" data-toggle="tooltip" title="Delete" disabled>
			<i class="ion-trash-b"></i>
		</button>
		<button class="margin_2px btn future-button display_block align_left" id="rep-approve" data-toggle="tooltip" title="Approve" disabled>
			<i class="ion-checkmark"></i>
		</button>
		<button class="margin_2px btn future-button display_block align_left" id="rep-reject" data-toggle="tooltip" title="Reject" disabled>
			<i class="ion-close"></i>
		</button>
	</div>
	<div class="display_table align_right j_menu">
		<form action="{{ url('/reporting/reload') }}" class="ejex_form display_block align_left margin_2px" method="post" data-type="json" data-onsuccess="refresh_request" data-custom-message="none" id="reload-request-table">
			<button class="btn future-button">
				<div class="display_table">
					<div class="display_row">
						<div class="display_cell padding_right5px">
							<i class="fa fa-refresh"></i>
						</div>
						<div class="display_cell">Reload Request</div>
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
						<form action="{{ url('/reporting/data-filter') }}" class="ejex_form" method="post" data-type="json" data-onsuccess="refresh_request" data-custom-message="none">
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
	<table class="dtable table table-responsive table_all_center font_size13px future-table table_vertical_align_middle" id="reporting-table">
		<thead>
			<tr>
				<th class="dt_dont_click">
					<input type="checkbox" name="checkall" class="future-checkbox">
				</th>
				<th>ITEM ID</th>
				<th>ITEM NAME</th>
				<th>ITEM QUANTITY</th>
				<th>STATUS</th>
				<th>REQUESTOR</th>
				<th>REQUEST DATE</th>
			</tr>
		</thead>
		<tbody>
			@foreach($pending_items as $i)
			<tr data-id="{{ $i->id }}" data-status="pending">
				<td>
					<input type="checkbox" name="item" class="future-checkbox">
				</td>
				<td>{{ $i->item_id }}</td>
				<td>{{ $i->item_name }}</td>
				<td>{{ $i->item_quantity }}</td>
				<td>
					<i class="ion-android-time" data-toggle="tooltip" title="Pending"></i>
				</td>
				<td>{{ $i->name }}</td>
				<td>{{ $i->created_at }}</td>
			</tr>
			@endforeach
			@foreach($history_items as $i)
			<tr data-id="{{ $i->id }}" data-status="approve">
				<td>
					<input type="checkbox" name="item" class="future-checkbox">
				</td>
				<td>{{ $i->item_id }}</td>
				<td>{{ $i->item_name }}</td>
				<td>{{ $i->item_quantity }}</td>
				<td>
					<i class="ion-checkmark" data-toggle="tooltip" title="Approve"></i>
				</td>
				<td>{{ $i->name }}</td>
				<td>{{ $i->created_at }}</td>
			</tr>
			@endforeach
		</tbody>
	</table>
</div>




