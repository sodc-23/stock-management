
@extends('layouts.master')

@section('header')
<title>Inventory System | Inventory Reporting</title>

@stop

@section('top resources')
<link rel="stylesheet" href="/core/css/pages/reporting.css" type="text/css">
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
						<i class="fa fa-bar-chart" aria-hidden="true"></i>
					</div>
					<div class="display_cell">REPORTING</div>
				</div>
			</h1>
			
		</div>
		<div class="extend clear" style="height:20px"></div>
		<div class="container-fluid">
			<div class="row">
				<section class="col-lg-12 j_menu">
					<ul class="j_menu_nav padding_zero display_table full_width" data-tabs-container="reporting-tabs-container" id="reporting-tabs-menu">
						<li>
							<a href="#r_tab1" class="j_parent j_active j_active_state" data-allow-active="yes" data-allow-hover="yes" data-tabs="yes" data-monkey-run="check_message">Request Table</a>
						</li>
						<li>
							<a href="#r_tab2" class="j_parent" data-allow-active="yes" data-allow-hover="yes" data-tabs="yes" data-monkey-run="reporting_inventory_tab check_message">Reporting Graph</a>
						</li>
						<li>
							<a href="#r_tab3" class="j_parent" data-allow-active="yes" data-allow-hover="yes" data-tabs="yes" data-monkey-run="check_message">Messages <span class="badge" style="border:1px solid #ffffff;background:none;" id="messages-counter-badge">{{ count($messages) }}</span></a>
						</li>
					</ul>
					<div class="j_line margin_bottom7px" style="height:2px;"></div>
					<div class="extend clear perent" id="reporting-tabs-container">
						<div class="j_tabs" id="r_tab1">
							@include('layouts.partials.pages.reporting._request_table')
						</div>
						<div class="thehide j_tabs display_table full_width" id="r_tab2">
							<div class="display_table full_width margin_bottom7px">
								<div class="display_table align_left">
									<label class="margin_bottom0px font_size13px margin_top10px" id="graph_title">Graph {{ date('Y') }}</label>
								</div>
								<div class="display_table align_right">
									<form action="{{ url('/reporting/graph') }}" class="ejex_form display_block align_left margin_2px" method="post" data-type="json" data-onsuccess="refresh_reporting_graph" data-custom-message="none">
										<button class="btn future-button">
											<div class="display_table">
												<div class="display_row">
													<div class="display_cell padding_right5px">
														<i class="fa fa-refresh"></i>
													</div>
													<div class="display_cell">Reload Graph</div>
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
													<form action="{{ url('/reporting/graph/data-filter') }}" class="ejex_form" method="post" data-type="json" data-onsuccess="refresh_reporting_graph" data-custom-message="none" data-success-function="render_graph_title" id="graph-data-filter">
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
							<div class="full_width chart" id="inventory-request-chart" style="min-height:320px;"></div>
						</div>
						<div class="thehide j_tabs display_table full_width" id="r_tab3">
							@include('layouts.partials.pages.reporting._messages_table')
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>
</div>

@stop

@section('bottom resources')
<!-- datatables -->
<script type="application/javascript" src="/core/plugins/datatables/datatables.min.js"></script>
<!-- highcharts -->
<script type="application/javascript" src="/core/plugins/highcharts/js/highcharts.js"></script>
<!-- role admin and inventory js -->
<script type="application/javascript" src="/core/js/pages/reporting/role-inventory.js"></script>
@stop