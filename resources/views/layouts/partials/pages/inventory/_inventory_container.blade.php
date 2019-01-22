<form action="{{ url('/inventory/item-engine') }}" class="ejex_form" data-type="json" method="post" data-onsuccess="refresh_inventory" data-success-function="hide_pokemon" data-custom-message="New item has been added">
	<input type="hidden" name="type" value="add">
	<input type="hidden" name="id" value="">
	<fieldset>
		<div class="form-group">
			<label>ITEM NAME</label>
			<input type="text" class="form-control future-input" name="item_name" required>
		</div>
		<div class="form-group">
			<label>ITEM DESCRIPTION</label>
			<textarea name="item_description" class="form-control future-input"></textarea>
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
					<div class="display_cell">SAVE</div>
				</div>
			</div>
		</button>
	</div>
</form>