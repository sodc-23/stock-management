<form action="{{ url('/profile/profile-engine/add') }}" class="ejex_form" data-type="json" method="post" data-onsuccess="add_profile" data-custom-message="Cheers! successfully created a new profile" data-success-function="hide_pokemon">
	<input type="hidden" name="type" value="add">
	<input type="hidden" name="id" value="">
	<fieldset>
		<label class="margin_bottom5px">
			<div class="display_table">
				<div class="display_row">
					<div class="display_cell padding_right5px"><i class="ion-person"></i> </div>
					<div class="display_cell">ACCOUNT CREATION</div>
				</div>
			</div>
		</label>
		<div class="extend clear display_table full_width margin_bottom10px">
			<div class="form-group @if(strtolower($current_user_info->roles_id->role->role_name) !== "admin") thehide @endif">
				<label>USERNAME</label>
				<input type="text" class="form-control future-input" name="username" required>
			</div>
			<div class="form-group">
				<label>PASSWORD</label>
				<input type="password" class="form-control future-input" name="password" required>
			</div>
			<div class="form-group">
				<label>CONFIRM PASSWORD</label>
				<input type="password" class="form-control future-input" name="c_password" required>
			</div>
			<div class="form-group @if(strtolower($current_user_info->roles_id->role->role_name) !== "admin") thehide @endif">
				<label>ROLE</label><br>
				<select name="role" class="form-control future-select">
					<option disabled selected>Select role</option>
					@foreach($roles as $role)
					<option value="{{ $role->role_id}}">{{ $role->role_name }}</option>
					@endforeach
				</select>
			</div>
			<div class="form-group">
				<div class="display_table">
					<div class="display_row">
						<div class="display_cell padding_right7px">
							<input type="checkbox" class="future-checkbox" name="show_password">
						</div>
						<div class="display_cell">Show password</div>
					</div>
				</div>
			</div>
		</div>
		<label class="margin_bottom5px">
			<div class="display_table">
				<div class="display_row">
					<div class="display_cell padding_right5px"><i class="ion-clipboard"></i> </div>
					<div class="display_cell">PROFILE CREATION</div>
				</div>
			</div>
		</label>
		<div class="extend clear display_table full_width">
			<div class="form-group">
				<label>IMAGE</label>
				<input type="file" name="image" class="form-control future-input" accept="image/*" />
			</div>
			<div class="form-group">
				<label>FULL NAME</label>
				<input type="text" class="form-control future-input" name="fullname" required>
			</div>
			<div class="form-group">
				<label>AGE</label><br>
				<select name="age" class="form-control future-select">
					<option value="18" selected>18</option>
					<?php
						for($i = 19; $i <= 80; $i++){
							echo '<option value="'.$i.'">'.$i.'</option>';
					 	}
					?>
				</select>
			</div>
			<div class="form-group">
				<label>ADDRESS</label>
				<input type="text" class="form-control future-input" name="address">
			</div>
			<div class="form-group">
				<label>MARITAL STATUS</label><br>
				<select name="marital_status" class="form-control future-select">
					<option value="single" selected>Single</option>
					<option value="widowed">Widowed</option>
					<option value="married">Married</option>
				</select>
			</div>
			<div class="form-group">
				<label>EMAIL</label>
				<input type="email" class="form-control future-input" name="email" aria-required=”true” required>
			</div>

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