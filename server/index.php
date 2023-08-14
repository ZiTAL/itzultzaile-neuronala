<?php
require_once('code.php');
require_once('save.php');

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$post = file_get_contents("php://input");
if(strlen($post)>0)
{
    try
    {
        $params = json_decode($post, true);
        $code   = (!isset($params['code']))?Code::get():Code::clean($params['code']);
        Save::set($code, $params['original'], $params['translate']);
        output(
        [
            'code' => $code
        ]);
    }
    catch(Exception $e)
    {
        error($e);
    }
}
elseif(count($_GET)>0)
{
    if(isset($_GET['code']))
    {
        try
        {
            $code   = Code::clean($_GET['code']);
            $result = Save::get($code);

            output($result);
        }
        catch(Exception $e)
        {
            error($e);
        }
    }
    if(isset($_GET['createCode']))
    {
        try
        {
            output(
            [
                'code' => Code::get()
            ]);
        }
        catch(Exception $e)
        {
            error($e);
        }
    }
}

function output($data)
{
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($data);
}

function error($e)
{
    http_response_code(500);
    header('Content-type: application/json; charset=utf-8');
    echo json_encode(['error' => $e->getMessage()]);
}