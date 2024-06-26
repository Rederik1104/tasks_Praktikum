<?php

    $dbconfig['host'] = "localhost";
    $dbconfig['user'] = "root";
    $dbconfig['base'] = "todo";
    $dbconfig['pass'] = "";
    $dbconfig['char'] = "utf8";

    try{
        $pdo = new PDO('mysql:host='.$dbconfig['host'].';dbname='.$dbconfig['base'].';charset='.$dbconfig['char'].';',$dbconfig['user'], $dbconfig['pass']
    );
    }catch(PDOException $e){
        exit('Unable to connect database');
    }

    

?>