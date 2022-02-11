<?php

require("../conexion/conexion.php");

$cedula = json_decode($_POST['cedula']);

$conexion = new Conexion();

$con = $conexion -> CargaConexion();

//mysqli_set_charset($conexion,"utf8");

$sql = "Call spVerificarCedula('$cedula')";

$resultado = mysqli_query($con, $sql);

//echo json_encode($resultado);

$json = array();

while($row = mysqli_fetch_array($resultado)){
    $json[] = array(
        'Dato' => $row['Dato'],
        'cedula' => $row['cedula'],
        'nombre' => $row['nombre'],
        'apellido' => $row['apellido'],
        'Empresa' => $row['Empresa'],
        'cargo' => $row['cargo']
    );
}

$jsonstring = json_encode($json);
echo $jsonstring;

?>