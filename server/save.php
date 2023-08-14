<?php
require_once('code.php');

class Save
{
    public static function set($code, $original, $translate)
    {
        $code   = Code::clean($code);
        $folder = __DIR__."/../saves/{$code}";
        mkdir($folder, 0777, true);
        file_put_contents("{$folder}/original",  $original);
        file_put_contents("{$folder}/translate", $translate);
    }

    public static function get($code)
    {
        $code   = Code::clean($code);
        $folder = realpath(__DIR__."/../saves/{$code}");
        $result =
        [
            'original'  => file_get_contents("{$folder}/original"),
            'translate' => file_get_contents("{$folder}/translate")
        ];
        return $result;
    }
}