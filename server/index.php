<?php
require_once('code.php');
require_once('save.php');

if(isset($_POST))
{
    try
    {
        $params = json_decode(file_get_contents("php://input"), true);
        $code   = (!isset($params['code']))?Code::get():Code::clean($params['code']);
        Save::set($code, $params['original'], $params['translate']);
    }
    catch(Exception $e)
    {
        http_response_code(500);
    }
}
elseif(isset($_GET))
{
    try
    {
        $code = Code::clean($_GET['code']);
        $result = Save::get($code);
        echo json_encode($result);
    }
    catch(Exception $e)
    {
        http_response_code(500);
    }
}
