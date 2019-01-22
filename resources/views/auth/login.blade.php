@extends('layouts.master')

@section('top resources')
<title>Inventory System | Login</title>
<link rel="stylesheet" href="/core/css/login.css" type="text/css" >
@stop

@section('content')
<div id="login-wrapper" class="thehide radius_3px shadow-z-1">
    <h1 id="logo">INVENTORY SYSTEM</h1>
    <form action="{{ url('/login') }}" class="ejex_form" method="post" data-type="json" method="post" data-onsuccess="login" data-custom-message="Successfully logged in, redirecting...">
        <fieldset style="border:none;">
            <div class="form-group">
                <div class="input-group future-input-group">
                  <span class="input-group-addon" id="sizing-addon2">
                      <i class="fa fa-user"></i>
                  </span>
                  <input type="text" class="form-control future" placeholder="Username..." name="username" required>
                </div>
            </div>
            <div class="form-group">
                <div class="input-group future-input-group">
                  <span class="input-group-addon" id="sizing-addon2">
                      <i class="fa fa-lock"></i>
                  </span>
                  <input type="password" class="form-control future" placeholder="Password..." name="password" required>
                </div>
            </div>
        </fieldset>
        <div class="margin_top10px display_table center">
            <button class="btn btn-default margin_zero future-button">
                <div class="display_table">
                    <div class="display_row">
                        <div class="display_cell padding_right5px">
                            <i class="fa fa-lock"></i>
                        </div>
                        <div class="display_cell">LOGIN</div>
                    </div>
                </div>
            </button>
        </div>
    </form>
</div>
@endsection

@section('bottom resources')
<script type="application/javascript" src="/core/js/login.js"></script>
@stop
