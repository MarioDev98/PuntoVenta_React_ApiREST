<?php

include 'bd/BD.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from proveedores where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from proveedores";
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
    $RFC=$_POST['RFC'];
    $query="insert into proveedores(nombre, a_paterno,a_materno,telefono,correo,RFC) values ('$nombre', '$a_paterno', '$a_materno', '$telefono', '$correo', '$RFC')";
    $queryAutoIncrement="select MAX(id) as id from proveedores";
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
    $RFC=$_POST['RFC'];
    $query="UPDATE proveedores SET nombre='$nombre', a_paterno='$a_paterno', a_materno='$a_materno', telefono='$telefono', correo='$correo' , 
    RFC='$RFC' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $query="DELETE FROM proveedores WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>