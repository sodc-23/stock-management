
@extends('layouts.master')

@section('header')
<title>Inventory System | Inventory</title>

@stop

@section('top resources')
<link rel="stylesheet" href="/core/css/pages/inventory.css" type="text/css">
<!-- datatables -->
<link rel="stylesheet" href="/core/plugins/datatables/datatables.min.css" type="text/css">
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
					<div class="display_cell">INVENTORY</div>
				</div>
			</h1>
			<div class="display_table align_right">
				<div class="display_row">
					@if(strtolower($current_user_info->roles_id->role->role_name) === "admin" || strtolower($current_user_info->roles_id->role->role_name) === "inventory")
					<div class="display_cell padding_right5px">
						<a href="#" class="btn future-button margin_zero" id="add-item">
							<div class="display_table">
								<div class="display_row">
									<div class="display_cell padding_right5px"><i class="ion-plus"></i></div>
									<div class="display_cell">ADD NEW ITEM</div>
								</div>
							</div>
						</a>
					</div>
					@endif
					<div class="display_cell">
						<form action="{{ url('/inventory/items/get-items') }}" class="ejex_form" method="post" data-type="json" data-onsuccess="get_items" data-custom-message="none">
							<button class="btn future-button margin_zero">
								<div class="display_table">
									<div class="display_row">
										<div class="display_cell padding_right5px"><i class="ion-plus"></i></div>
										<div class="display_cell">REQUEST ITEM</div>
									</div>
								</div>
							</button>
						</form>
					</div>
					
				</div>
			</div>
		</div>
		<div class="extend clear" style="height:20px"></div>
		<div class="container-fluid">
			<div class="row">
				<section class="col-lg-12">
					@include('layouts.partials.pages.inventory._inventory_table')
				</section>
			</div>
		</div>
	</div>
</div>
<div class="thehide" id="inventory-item-gallery-container">
	@include('layouts.partials.pages.inventory._inventory_item_gallery_container')
</div>
@if(strtolower($current_user_info->roles_id->role->role_name) === "admin" || strtolower($current_user_info->roles_id->role->role_name) === "inventory")
<div id="inventory-container" class="thehide">
	@include('layouts.partials.pages.inventory._inventory_container')
</div>
@endif
<div id="request-item-container" class="thehide">
	@include('layouts.partials.pages.inventory._request_item_container')
</div>

@stop

@section('bottom resources')
<!-- datatables -->
<script type="application/javascript" src="/core/plugins/datatables/datatables.min.js"></script>
@if(strtolower($current_user_info->roles_id->role->role_name) === "admin" || strtolower($current_user_info->roles_id->role->role_name) === "inventory")
<script type="application/javascript" src="/core/js/pages/inventory/role-inventory.js"></script>
@else
<script type="application/javascript" src="/core/js/pages/inventory/role-user.js"></script>
@endif

@stop