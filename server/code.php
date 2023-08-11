<?php
class Code
{
    public static $characters = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789';

    public static function get($codeLength = 6)
    {
        $characters_length = strlen(self::$characters);

        do
        {
            $short_code = '';
            for ($i = 0; $i < $codeLength; $i++)
            {
                $index       = rand(0, $characters_length - 1);
                $short_code .= self::$characters[$index];
            }
        }
        while($short_code==='' || self::exists($short_code));

        return $short_code;
    }

    public static function clean($code)
    {
        $characters = self::$characters;
        $code       = preg_replace("/{$characters}/", '', $code);
        return $code;
    }

    public static function exists($code)
    {
        $folder = realpath(__DIR__."/../saves/{$code}");
        if(is_dir($folder))
            return true;
        return false;
    }
}
