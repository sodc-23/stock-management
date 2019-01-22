<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Inventory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inventory',function(Blueprint $table){
            $table->string('item_name')->primary()->unique();
            $table->string('username')->index();
            $table->string('item_description')->nullable();
            $table->string('item_quantity')->default(0); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //drop inventory table
        Schema::drop('inventory');
    }
}
