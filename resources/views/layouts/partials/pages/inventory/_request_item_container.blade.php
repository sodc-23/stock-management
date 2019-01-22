<form action="{{ url('/inventory/item-engine') }}" class="ejex_form" data-type="json" method="post" data-onsuccess="refresh_inventory" data-custom-message="Item has been requested">
	<input type="hidden" name="type" value="request_item">
	<input type="hidden" name="id" value="{{ $current_user_info->username }}">
	<fieldset>
		<div class="form-group">
			<label>ITEM NAME</label>
			<div class="extend clear">
				<select name="item_id" class="form-control future-select">
					<option disabled selected>Select item</option>
				</select>
			</div>
		</div>
		<div class="form-group">
			<label>ITEM QUANTITY</label>
			<input type="number" class="form-control future-input" name="item_quantity" required>
		</div>
	</fieldset>
	<div class="display_table center">
		<button class="btn future-button">
			<div class="display_table">
				<div class="display_row">
					<div class="display_cell padding_right5px"><i class="ion-checkmark"></i> </div>
					<div class="display_cell">REQUEST ITEM</div>
				</div>
			</div>
		</button>
	</div>
</form>