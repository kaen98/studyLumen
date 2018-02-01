<?php

namespace App\Http\Controllers;
use DB;
class UserController extends Controller
{
    public function show() {
//        DB::collection('users')               //选择使用users集合
//                ->insert([                          //插入数据
//                'name'  =>  'tom',
//                'age'     =>   18
//            ]);

        $res = DB::collection('users')->get();  //查询所有数据
        dd($res);
    }


}
