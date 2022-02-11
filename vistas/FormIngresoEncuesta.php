<?php

$usuario = $_POST['usuario'];
$pregunta = $_POST['pregunta'];
$respuesta = $_POST['respuesta'];
$lugar = $_POST['lugar'];
$final = $_POST['final'];

require("../conexion/conexion.php");

$conexion = new Conexion();

$con = $conexion -> CargaConexion();

if($final == "si"){

    $sql = "call spInsertaEncuestaUser('$pregunta', '$respuesta', '$usuario', '$lugar');";

    $resultado = mysqli_query($con, $sql);

    echo json_encode($resultado);

    $con -> close();

}
else{
    
    $sql = "call spInsertaEncuestaUsuario('$usuario', '$pregunta', '$respuesta', '$lugar')";

    $resultado = mysqli_query($con, $sql);

    echo json_encode($resultado);

    $con -> close();
}


?>