<div class="display_table full_width margin_bottom7px">
	@if(strtolower($current_user_info->roles_id->role->role_name) === "admin" || strtolower($current_user_info->roles_id->role->role_name) === "inventory")
	<div class="display_table align_left">
		<button class="margin_2px btn future-button display_block align_left" id="inv-edit" data-toggle="tooltip" title="Edit" disabled>
			<i class="ion-edit"></i>
		</button>
		<button class="margin_2px btn future-button display_block align_left" id="inv-delete" data-toggle="tooltip" title="Delete" disabled>
			<i class="ion-trash-b"></i>
		</button>
	</div>
	@endif
	<div class="display_table align_right j_menu">
		<form action="{{ url('/inventory/reload-inventory') }}" class="ejex_form display_block align_left margin_2px" method="post" data-type="json" data-onsuccess="refresh_inventory" data-custom-message="none" id="reload-inventory-table">
			<button class="btn future-button">
				<div class="display_table">
					<div class="display_row">
						<div class="display_cell padding_right5px">
							<i class="fa fa-refresh"></i>
						</div>
						<div class="display_cell">Reload Inventory</div>
					</div>
				</div>
			</button>
		</form>
		<ul class="j_menu_nav menu padding_zero display_block margin_2px align_left">
			<li>
				<a href="#" class="btn future-button j_parent" data-has-submenu="yes">
					<div class="display_table">
					    <div class="display_row">
					        <div class="display_cell padding_right7px j_text">Data Filter</div>
					        <div class="display_cell vertical_align_middle" style="width:5px;"><i class="ion-android-arrow-dropdown"></i> </div>
					    </div>
					</div>
				</a>
				<ul class="j_menu_dp_container font_size13px padding_15px " style="margin-top:5px;">
					<li>
						<form action="{{ url('/inventory/data-filter') }}" class="ejex_form" method="post" data-type="json" data-onsuccess="refresh_inventory" data-custom-message="none">
							<div class="form-group">
								<label>FROM</label>
								<input type="text" class="form-control future-input datepicker" name="from">
							</div>
							<div class="form-group">
								<label>TO</label>
								<input type="text" class="form-control future-input datepicker" name="to">
							</div>
							<div class="display_table center margn_top10px">
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
	<table class="dtable table table-responsive table_all_center font_size13px future-table table_vertical_align_middle" id="inventory-table">
		<thead>
			<tr>
				<th class="dt_dont_click">
					<input type="checkbox" name="checkall" class="future-checkbox">
				</th>
				<th>ITEM ID</th>
				<th>ITEM GALLERY</th>
				<th>NAME</th>
				<th>DESCRIPTION</th>
				<th>QUANTITY</th>
				<th>CREATED</th>
			</tr>
		</thead>
		<tbody>
		@foreach($inv as $i)
			<tr data-id="{{ $i->item_id }}">
				<td>
					<input type="checkbox" name="item" class="future-checkbox">
				</td>
				<td>
					{{ $i->item_id }}
				</td>
				<td>
					<form action="{{ url('/inventory/item/item-images') }}" class="ejex_form display_table center" method="post" data-type="json" data-onsuccess="item_gallery" data-custom-message="none">
						<input type="hidden" name="id" value="{{ $i->item_id }}">
						<button class="btn future-button item-gallery">
							<div class="display_table">
								<div class="display_row">
									<div class="display_cell padding_right5px">
										<i class="ion-images"></i>
									</div>
									<div class="display_cell">VIEW IMAGES</div>
								</div>
							</div>
						</button>
					</form>
				</td>
				<td>
					{{ $i->item_name }}
				</td>
				<td>
					{{ $i->item_description }}
				</td>
				<td>
					{{ $i->item_quantity }}
				</td>
				<td>
					{{ $i->created_at }}
				</td>
			</tr>
		@endforeach
		</tbody>
	</table>
</div>

