<?php

$cedula = $_POST['cedula'];
$nombre = $_POST['nombre'];
$empresa = $_POST['empresa'];
$motivo = $_POST['motivo'];

require("../conexion/conexion.php");

$conexion = new Conexion();

$con = $conexion -> CargaConexion();

$sql = "call spInsertarNuevoUsuario('$cedula','$nombre', '$empresa','$motivo')";

$resultado = mysqli_query($con, $sql);

$json = array();

while($row = mysqli_fetch_array($resultado)){
    $json = array('usuario' => $row['usuario']);
}

echo json_encode($json);

?>