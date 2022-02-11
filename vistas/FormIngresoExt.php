<?php

$usuario = json_decode($_POST['usuario']);
$pregunta = json_decode($_POST['pregunta']);
$respuesta = json_decode($_POST['respuesta']);
$lugar = json_encode($_POST['lugar']);
$final = json_encode($_POST['final']);

require("../conexion/conexion.php");

$conexion = new Conexion();

$con = $conexion -> CargaConexion();

if($con ->connect_errno){

    echo json_encode("Error en base de datos");

}else{

    $sql = "call spInsertaRptaNewUser('$usuario','$pregunta', '$respuesta', '$lugar')";

    $resultado = mysqli_query($con, $sql); 

    echo json_encode($resultado); 
}

$con -> close(); 

?>