<?php

include 'bd/BD.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from productos where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from productos";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $nombre=$_POST['nombre'];
    $c_barras=$_POST['c_barras'];
    $costo=$_POST['costo'];
    $precio=$_POST['precio'];
    $existencia=$_POST['existencia'];
    $query="insert into productos(nombre, c_barras,costo,precio,existencia) values ('$nombre', '$c_barras', '$costo', '$precio', '$existencia')";
    $queryAutoIncrement="select MAX(id) as id from productos";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $nombre=$_POST['nombre'];
    $c_barras=$_POST['c_barras'];
    $costo=$_POST['costo'];
    $precio=$_POST['precio'];
    $existencia=$_POST['existencia'];
    
    $query="UPDATE productos SET nombre='$nombre', c_barras='$c_barras', costo='$costo', precio='$precio', existencia='$existencia' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $query="DELETE FROM productos WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>