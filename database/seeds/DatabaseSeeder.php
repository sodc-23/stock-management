<?php

use Illuminate\Database\Seeder;
// use App\User;
use App\inventory;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        // User::create([
		//     'username'     => 'admin',
		//     'password'  => Hash::make('admin'),
		//     'real_password' => 'admin'
		// ]);

        //check and count inventory records
        $inventory = inventory::all();
        if(count($inventory)){
            $item_id = 'inv_'.$this->randomString().'_'.(count($inventory)+1);
        }else{
            $item_id = 'inv_'.$this->randomString().'_'.'1';
        }
        
        inventory::create([
            'item_id'     => $item_id,
            'username'  => 'admin',
            'item_name' => 'Medicine 3',
            'item_description' => 'If you take this you will eventually die',
            'item_quantity' => 20
        ]);
    }

    function randomString($length = 6) {
        $str = "";
        $characters = array_merge(range('A','Z'), range('a','z'), range('0','9'));
        $max = count($characters) - 1;
        for ($i = 0; $i < $length; $i++) {
            $rand = mt_rand(0, $max);
            $str .= $characters[$rand];
        }
        return $str;
    }

}
