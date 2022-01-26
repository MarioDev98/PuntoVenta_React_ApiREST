<?php

include 'bd/BD.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from clientes where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from clientes";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $nombre=$_POST['nombre'];
    $a_paterno=$_POST['a_paterno'];
    $a_materno=$_POST['a_materno'];
    $telefono=$_POST['telefono'];
    $correo=$_POST['correo'];
    $query="insert into clientes(nombre, a_paterno,a_materno,telefono,correo) values ('$nombre', '$a_paterno', '$a_materno', '$telefono', '$correo')";
    $queryAutoIncrement="select MAX(id) as id from clientes";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $nombre=$_POST['nombre'];
    $a_paterno=$_POST['a_paterno'];
    $a_materno=$_POST['a_materno'];
    $telefono=$_POST['telefono'];
    $correo=$_POST['correo'];
    $query="UPDATE clientes SET nombre='$nombre', a_paterno='$a_paterno', a_materno='$a_materno', telefono='$telefono', correo='$correo' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $query="DELETE FROM clientes WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>