<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::auth();

Route::get('/home', 'HomeController@index');
Route::get('/', 'HomeController@index');
// P R O F I L E
Route::get('/profile', 'ProfileController@index');
Route::post('/profile/profile-engine/edit', 'ProfileController@profile_engine');
//for a user who has a role of either 'admin' or 'profile'
Route::group(['middleware' => ['CheckProfileRole']], function () {
	//get user
	Route::post('/profile/get-user', 'ProfileController@get_user');
	//create profile
	Route::post('/profile/profile-engine/add', 'ProfileController@profile_engine');
	Route::post('/profile/profile-engine/delete', 'ProfileController@profile_engine');
});

// I N V E N T O R Y
Route::get('/inventory','InventoryController@index');
//get images
Route::post('/inventory/item/item-images','InventoryController@get_images');
//path for image from the storage
Route::get('/inventory/gallery-images/image/{image}', function($image = null)
{
    $path = storage_path().'/app/public/items_gallery/' . $image;
    if (file_exists($path)) { 
        return Response::download($path);
    }
});
//data filter
Route::post('/inventory/data-filter','InventoryController@data_filter');
//reload inventory
Route::post('/inventory/reload-inventory','InventoryController@reload_inventory');
//get items
Route::post('/inventory/items/get-items','InventoryController@get_items');


//for a user only who has a role of either 'admin' or 'inventory' can access the full features of the inventory section
Route::group(['middleware' => ['CheckInventoryRole']], function () {
	//upload images
	Route::post('/inventory/gallery/image/upload','InventoryController@upload_image');
	//delete image
	Route::post('/inventory/gallery/image/delete','InventoryController@delete_image');
	//add new item,edit item,delete item
});

Route::post('/inventory/item-engine','InventoryController@item_engine');

// R E P O R T I N G
// send message to admin
Route::post('/send-message','ReportingController@send_message');

//for a user only who has a role of either 'admin' or 'inventory'
Route::group(['middleware' => ['CheckReportingRole']], function () {
	//REPORTING
	Route::get('/reporting','ReportingController@index');
	Route::post('/reporting/reload','ReportingController@reload_inventory_request');
	Route::post('/reporting/graph','ReportingController@get_reporting_request_graph');
	Route::post('/reporting/reload','ReportingController@reload_inventory_request');
	Route::post('/reporting/data-filter','ReportingController@get_reporting_inventory_data_filter');
	Route::post('/reporting/graph/data-filter','ReportingController@get_reporting_graph_data_filter');
	Route::post('/reporting/request-table/delete','ReportingController@request_delete');
	Route::post('/reporting/request-table/approve','ReportingController@request_approve');
	Route::post('/reporting/request-table/reject','ReportingController@request_reject');

	//MESSAGES
	// reload messages
	Route::post('/reporting/messages/reload','ReportingController@reload_messages');
	//when click the unread message
	Route::post('/reporting/messages/read','ReportingController@read_message');
	Route::post('/reporting/message-table/delete','ReportingController@delete_message');
});


// N O T I F I C A T I O N S
Route::post('/notifications/clear','NotificationController@notify');

//test route
Route::get('/test/{notification}','NotificationController@notify');
