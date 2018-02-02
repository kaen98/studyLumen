<?php
// $data = isset($_GET['data']) ? $_GET['data'] : '';
$data = isset($_POST['data']) ? $_POST['data'] : '';
$dataArr = json_decode($data, true);
echo json_encode(array('data' => $dataArr));