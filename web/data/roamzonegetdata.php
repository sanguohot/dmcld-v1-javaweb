<?php	
require_once "sessioncheck.php";
require_once "mysqllib.php";
$zonearr = arr_get_from_tbl("tbl_roamzone");

$newrow = array();
foreach($zonearr as $key => $value)
{
    //We create a new array with special key for the web to explain.
    $newrow["roamzoneid"] = $value["roamzoneid"];
	$newrow["roamzonename"] = $value["roamzonename"];
	$newarr[]=$newrow;    
}

echo json_encode($newarr);
?>

