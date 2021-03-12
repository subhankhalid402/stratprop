<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class ImageHelper
{
    public static function saveBase64($base_64, $path, $file_name = '', $extension = 'jpg')
    {
        if ($file_name == '') {
            $file_name = sha1(rand(1111, 9999) . strtotime("now")) ;
        }
        $file_name .= '.' . $extension;

        list($type, $data) = explode(';', str_replace("charset=utf-8;", "", $base_64));
        list(, $data) = explode(',', $data);
        $data = base64_decode($data);

        $file_path = $path . '/' .  $file_name;
        file_put_contents(public_path() . '/../../' . $file_path, $data);

        return $file_path;
    }
}
