<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show() {
        $res = DB::collection('collectData')->get();  //查询所有数据
        dd($res);
    }

    // 流量统计
    public function add(Request $request) {
        $data = $request->input('data');
        if (!$data){
            return $this->error('data数据缺失');
        }
        $arrayData = json_decode($data, true);
        if (!$arrayData) {
            return $this->error('data数据格式非法');
        }
        $insertData = array_merge($arrayData, array(
            'create_t' => date('Y-m-d H:i:s'),
            'update_t' => date('Y-m-d H:i:s'),
        ));
        $insertRst = DB::collection('collectData')
            ->insert($insertData);
        if(!$insertRst) {
            return $this->error('存储数据失败');
        }
        return $this->success('ok');
    }

    // 前端异常监控上报
    public function abnormalReport(Request $request) {
        $msg = $request->input('msg');
        if (!$msg) {
            return $this->error('msg数据缺失');
        }
        $insertRst = DB::collection('abnormalReport')
            ->insert([
                'msg' => $msg,
                'create_t' => date('Y-m-d H:i:s'),
                'update_t' => date('Y-m-d H:i:s'),
            ]);
        if(!$insertRst) {
            return $this->error('存储数据失败');
        }
        return $this->success('ok');
    }




























    /**
     * @param string $message
     * @param int $code
     * @param array $data
     * @return array
     */
    public function success($message, $code = 0, $data = [])
    {
        return [
            'status' => true,
            'code' => $code,
            'message' => $message,
            'data' => $data,
        ];
    }

    /**
     * @param string $message
     * @param int $code
     * @param array $data
     * @return array
     */
    public function error($message, $code = 10001, $data = [])
    {
        return [
            'status' => false,
            'code' => $code,
            'message' => $message,
            'data' => $data,
        ];
    }


}
