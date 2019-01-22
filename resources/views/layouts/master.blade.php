<!DOCTYPE html>
<html lang="en">
	<head>
		@yield('header')
		<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
		<!-- main css -->
		<link rel="stylesheet" href="/core/css/main.css" type="text/css">
		<link rel="stylesheet" href="/core/css/animate.css" type="text/css">
		<link rel="stylesheet" href="/core/css/responsive.css" type="text/css">
		<!-- j_components css -->
		<link rel="stylesheet" href="/core/plugins/j_components/j_components.css" type="text/css">
		<!-- bootstrap 3.3.6 css -->
		<link rel="stylesheet" href="/core/plugins/bootstrap/css/bootstrap.min.css" type="text/css">
		<!-- webfonts -->
		<link rel="stylesheet" href="/core/plugins/webfonts/roboto/roboto.css" type="text/css">
		<link rel="stylesheet" href="/core/plugins/webfonts/maven/maven.css" type="text/css" >
		<link rel="stylesheet" href="/core/skins/future.css" type="text/css" >
		<link rel="stylesheet" href="/core/plugins/webfonts/font-awesome/css/font-awesome.min.css" type="text/css">
		<link rel="stylesheet" href="/core/plugins/webfonts/ionic/css/ionicons.css" type="text/css">
		@yield('top resources')
	</head>
	<body class="j_components thehide" @if(isset($current_page))data-page="{{ $current_page }}"@endif data-token="{{ csrf_token() }}" data-link="{{ url('/') }}">
		<div id="main-wrapper" class="j_menu">
			@yield('top contents')
			@if(isset($current_page))
			<div class="padding_15px display_table full_width">
				<div class="future-container radius_3px display_table full_width">
					<nav role="navigation" id="top-nav" class="display_table align_left">
						<a href="" class="display_table align_left margin_right7px" id="logo2">I<span class="thehide">NVENTORY</span> S<span class="thehide">YSTEM</span></a>
						<ul class="menu j_menu_nav display_table align_left">
							<li><a href="{{ url('/home') }}" class="j_parent @if($current_page==="home") j_active j_active_state @endif " data-allow-hover="yes" data-allow-active="yes" data-navigate="yes">Home</a></li>
							<li><a href="{{ url('/profile') }}" class="j_parent @if($current_page==="profile") j_active j_active_state @endif " data-allow-hover="yes" data-allow-active="yes" data-navigate="yes">Profile</a></li>
							<li><a href="{{ url('/inventory') }}" class="j_parent @if($current_page==="inventory") j_active j_active_state @endif " data-allow-hover="yes" data-allow-active="yes" data-navigate="yes">Inventory</a></li>
							@if(strtolower($current_user_info->roles_id->role->role_name) === "admin" || strtolower($current_user_info->roles_id->role->role_name) === "inventory")
							<li>
								<a href="{{ url('/reporting') }}" class="j_parent @if($current_page==="reporting") j_active j_active_state @endif " data-allow-hover="yes" data-allow-active="yes" style="text-decoration: none;" data-navigate="yes">Reporting</a>
							</li>
							@endif
						</ul>
					</nav>
					<ul class="display_table align_right j_menu_nav menu padding_zero margin_zero">
						<?php $perm = array_column($current_user_info->permissions_id->toArray(), 'perm_id'); ?>
						@if(in_array(5,$perm))
						<li class="align_left dropdown">
							<a href="#" class="c_white display_block" style="font-size:25px;padding:9px 10px;text-decoration:none;" id="send-message">
								<i class="ion-paper-airplane"></i>
							</a>
						</li>
						@endif
						<li class="align_left dropdown">
							<a href="#" class="c_white display_block" style="font-size:25px;padding:9px 10px;text-decoration:none;" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" id="notification-badge">
								<i class="ion-android-notifications-none"></i> @if(count($messages)!==0 && count($notifications) !==0 || count($notifications) !==0 && count($messages) ===0 ||  count($messages) !==0 && count($notifications) ===0)<span class="badge" style="border:1px solid #ffffff;background:none;">{{ count($messages) + count($notifications) }}</span>@endif
							</a>
							<ul class="future-dropdown-menu dropdown-menu c_dark pull-right" style="padding:15px;width:300px;" id="notification-container">
                                <li>
									<ul class="overflow_y padding_zero margin_zero" id="notifications-holder" style="max-height:500px;">
										@if(count($messages)!==0 && count($notifications) !==0 || count($notifications) !==0 && count($messages) ===0 ||  count($messages) !==0 && count($notifications) ===0)
										@if(count($messages)!==0)
										<li>
											<a href="{{ url('/reporting') }}" data-navigate="yes">
												You have {!! count($messages) !!} unread message(s), click to read them.
											</a>
										</li>
										@endif
										@foreach($notifications as $n)
										<li>
											{!! $n->contents !!}
										</li>
										@endforeach
										@else
										<li class="empty-notification">Wooh! you have no notifications at the moment</li>
										@endif
									</ul>
								</li>
                            </ul>
						</li>
						<li class="align_left">
							<a class="display_table align_right c_white" style="padding:15px;" data-has-submenu="yes">
								<div class="display_row">
									<div class="display_cell padding_right10px">
										@if(isset($current_user_info->img) || $current_user_info->img)
											<img src="data:image/jpeg;base64,{{ base64_encode($current_user_info->img) }}" class="radius_circle bg_gray" style="width:25px;height:25px;display:block;">
										@else
											<div class="radius_circle bg_gray text_align_center" style="width:25px;height:25px;line-height:25px;display:block;margin:0 auto;">
												<i class="ion-person"></i>
											</div>
										@endif
									</div>
									<div class="display_cell padding_right10px vertical_align_middle">{{ $current_user_info->fullname }}</div>
									<div class="display_cell vertical_align_middle">
										<i class="ion-android-arrow-dropdown"></i>
									</div>
								</div>
							</a>
							<ul class="j_menu_dp_container thehide menu padding_15px c_dark radius_3px shadow-z-1" style="margin-top:55px;">
								<li>
									<a href="{{ url('/logout') }}" data-navigate="yes" class="font_size13px">
										<div class="display_table">
											<div class="display_row">
												<div class="display_cell padding_right5px"><i class="ion-log-out"></i></div>
												<div class="display_cell">Logout</div>
											</div>
										</div>
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			@endif
			@yield('content')
			@yield('bottom contents')
		</div>
		<button class="btn thehide" data-toggle="modal" data-target="#notification_dialog" id="notification_trigger_button">Open dialog</button>
	    <div id="notification_dialog" class="modal fade future-modal" tabindex="-1">
	        <div class="modal-dialog">
	          <div class="modal-content" id="text">
	            <div class="modal-header padding_zero">
	              <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> -->
	              <h4 class="modal-title display_table full_width text_transform_uppercase">Dialog</h4>
	            </div>
	            <div class="modal-body">
	            </div>
	            <div class="extend cler j_line"></div>
	            <div class="modal-footer">
	              <button class="btn future-button margin_zero" data-dismiss="modal">Close</button>
	            </div>
	          </div>
	        </div>
	    </div>
	    <button class="btn thehide" data-toggle="modal" data-target="#extra_modal" id="extra_modal_trigger_button">Open dialog</button>
	    <div id="extra_modal" class="modal fade future-modal" tabindex="-1">
	        <div class="modal-dialog">
	          <div class="modal-content" id="text">
	            <div class="modal-header padding_zero">
	              <h4 class="modal-title display_table full_width text_transform_uppercase">Dialog</h4>
	            </div>
	            <div class="modal-body">+
	                
	            </div>
	            <div class="extend cler j_line"></div>
	            <div class="modal-footer">
	              <button class="btn future-button margin_zero" data-dismiss="modal">Close</button>
	            </div>
	          </div>
	        </div>
	    </div>
		<div class="thehide" id="send-message-container">
			<form action="{{ url('/send-message') }}" class="ejex_form" method="post" data-type="json" data-onsuccess="send_message" data-custom-message="Message sent successfully" data-success-function="hide_pokemon">
				<fieldset>
					<div class="form-group overflow_auto">
						<textarea name="message" cols="30" rows="10" class="future-input form-control"></textarea>
					</div>
				</fieldset>
				<div class="display_table center button-holder">
					<button class="btn btn-success future-button">SEND</button>
				</div>
			</form>
		</div>
		<!-- jQuery 2 -->
		<script src="/core/plugins/jquery/jquery.js" type="application/javascript"></script>
		<!-- bootstrap 3.3.6 js -->
		<script src="/core/plugins/bootstrap/js/bootstrap.min.js" type="application/javascript"></script>
		<!-- momentjs -->
		<script src="/core/plugins/momentjs/momentjs.min.js" type="application/javascript"></script>
		<!-- j_components -->
		<script src="/core/plugins/j_components/j_components.js" type="application/javascript"></script>
		@if (Auth::check())
		<script>
			var permission = [{{ implode(', ', array_column($current_user_info->permissions_id->toArray(), 'perm_id')) }}].map(function(value) { return String(value); }),user='{{$current_user_info->username}}';
		</script>
		<!-- socket io -->
		<script src="/core/plugins/socketio/socketio.js"></script>
		<script src="/core/js/notifications.js"></script>
		@endif
		<script type="application/javascript" src="/core/skins/future.js"></script>
		@if(isset($current_page))
		<script src="/core/js/main.js" type="application/javascript"></script>
		@endif
		@yield('bottom resources')


	</body>	
</html>	