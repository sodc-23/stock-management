<div id="gallery-wrapper" class="display_table full_width padding_5px">
	@if(strtolower($current_user_info->roles_id->role->role_name) === "admin" || strtolower($current_user_info->roles_id->role->role_name) === "inventory")
	<div class="display_table full_width margin_bottom15px">
		<div class="display_row">
			<div class="display_cell" style="width:55px;">
				<button class="btn future-button" id="gallery-delete" data-toggle="tooltip" title="Delete" disabled>
					<i class="ion-trash-b"></i>
				</button>
			</div>
			<div class="display_cell thehide" id="edit_label">
				<div id="edit_label">Now, drop image or browse image using image browser to update the selected image.</div>	
			</div>
		</div>
	</div>
	@endif
	<div class="extend clear overflow_auto text_align_center" id="gallery-items-container">
		No images yet, upload images now!
	</div>
	@if(strtolower($current_user_info->roles_id->role->role_name) === "admin" || strtolower($current_user_info->roles_id->role->role_name) === "inventory")
	<div class="font_size13px text_style_italic margin_top20px margin_bottom5px">Drag and drop files here or browse file.</div>
	<input type="file" name="image"  accept="image/*" multiple>
	@endif
</div>