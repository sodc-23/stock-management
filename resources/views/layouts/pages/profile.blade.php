@extends('layouts.master')

@section('header')
<title>Inventory System | Profile</title>

@stop

@section('top resources')
<link rel="stylesheet" href="/core/css/pages/profile.css" type="text/css">
@stop

@section('content')
<div class="padding_15px" id="profile">
	<div class="future-container radius_3px font_size20px padding_15px">
		<div class="display_table full_width">
			<h1 class="title display_table align_left padding_top3px">
				<div class="display_row">
					<div class="display_cell padding_right5px">
						<i class="ion-person"></i>
					</div>
					<div class="display_cell">PROFILE</div>
				</div>
			</h1>
			<div class="display_table align_right">
				@if(strtolower($current_user_info->roles_id->role->role_name) === "admin")
				<div class="display_table align_left margin_right5px">
					<a href="#" class="btn future-button margin_zero" id="add-profile">
						<div class="display_table">
							<div class="display_row">
								<div class="display_cell padding_right5px"><i class="ion-plus"></i></div>
								<div class="display_cell">ADD NEW PROFILE</div>
							</div>
						</div>
					</a>
				</div>
				<div class="display_table align_left">
					<form action="{{ url('/profile/get-user') }}" class="ejex_form" method="post" data-type="json" data-onsuccess="profile" data-custom-message="none" id="get-user">
						<select name="users" id="select-employee-profile" class="form-control future-select" data-float="right" onchange="if($('#select-employee-profile').val()!=='') $('#get-user').trigger('submit');">
							<option disabled selected>Select profiles</option>
							<option value="{{ $current_user_info->username }}">Your Profile</option>
							@foreach($users as $user)
							<option value="{{ $user->username }}">{{ $user->fullname }}</option>
							@endforeach
						</select>
					</form>
				</div>
				@endif
			</div>
		</div>
		<div class="extend clear" style="height:20px"></div>
		<div class="container-fluid">
			<div class="row">
				<section class="col-lg-2">
					<div class="pulse" id="profile-image-container">
						@if(isset($current_user_info->img) || $current_user_info->img)
							<img src="data:image/jpeg;base64,{{ base64_encode($current_user_info->img) }}" class="radius_circle bg_gray" style="width:100px;height:100px;display:block;">
						@else
							<div class="radius_circle bg_gray text_align_center" style="width:100px;height:100px;line-height:100px;display:block;">
								<i class="ion-person" style="font-size:60px;"></i>
							</div>
						@endif
					</div>
					<!-- <div class="extend clear margin_top7px display_table center font_size18px perent">
						<div class="dynamic-input-label extend clear" data-identity="role">test</div>
					</div> -->
					<div class="extend clear margin_top7px display_table center font_size18px" data-identity="role">
						{{ $current_user_info->roles_id->role->role_name }}
					</div>
				</section>
				<section class="col-lg-10 font_size15px">
					<div class="container-fluid">
						<div class="row">
							<div class="col-sm-2">
								<label class="margin_top5px margin_zero">FULL NAME:</label>
								<div class="margin_top2px" data-identity="fullname">
									{{ $current_user_info->fullname }}
								</div>
							</div>
							<div class="col-sm-1">
								<label class="margin_top5px margin_zero">AGE:</label>
								<div class="margin_top2px" data-identity="age">
									{{ $current_user_info->age }}
								</div>
							</div>
							<div class="col-sm-4">
								<label class="margin_top5px margin_zero">ADDRESS:</label>
								<div class="margin_top2px" data-identity="address">
									{{ $current_user_info->address }}
								</div>
							</div>
							<div class="col-sm-2">
								<label class="margin_top5px margin_zero">MARITAL STATUS:</label>
								<div class="margin_top2px" data-identity="marital_status">
									{{ $current_user_info->marital_status }}
								</div>
							</div>
							<div class="col-sm-2">
								<label class="margin_top5px margin_zero">EMAIL:</label>
								<div class="margin_top2px" data-identity="email">
									{{ $current_user_info->email }}
								</div>
							</div>
						</div>
						<div class="divider"></div>
						<div class="row">
							<div class="col-sm-3">
								<label class="margin_top5px margin_zero">USERNAME:</label>
								<div class="margin_top2px" data-identity="username">
									{{ $current_user_info->username }}
								</div>
							</div>
							<div class="col-sm-3">
								<label class="margin_top5px margin_zero">PASSWORD:</label>
								<div class="margin_top2px" data-identity="password">
									{{ $current_user_info->account->real_password }}
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
		<div class="margin_top10px display_table center">
			<div class="display_row">
				<div class="display_cell">
					<a href="#" class="btn future-button margin_zero" id="edit-profile">
						<div class="display_table">
							<div class="display_row">
								<div class="display_cell padding_right5px"><i class="ion-edit"></i></div>
								<div class="display_cell">EDIT</div>
							</div>
						</div>
					</a>
				</div>
				@if(strtolower($current_user_info->roles_id->role->role_name) === "admin")
				<div class="display_cell padding_left5px">
					<a href="#" class="btn future-button margin_zero padding_left5px" id="delete-profile">
						<div class="display_table">
							<div class="display_row">
								<div class="display_cell padding_right5px"><i class="ion-android-delete"></i></div>
								<div class="display_cell">DELETE</div>
							</div>
						</div>
					</a>
				</div>
				@endif
			</div>
		</div>
	</div>
</div>

<div id="profile-container" class="thehide">
	@include('layouts.partials.pages.profile._profile_container')
</div>

@stop

@section('bottom resources')
@if(strtolower($current_user_info->roles_id->role->role_name) === "admin")
<script type="application/javascript" src="/core/js/pages/profile/role-admin.js"></script>
@else
<script type="application/javascript" src="/core/js/pages/profile/role-user.js"></script>
@endif
@stop