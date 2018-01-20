<?php	
require_once "sessioncheck.php";
require_once "mysqllib.php";
$sitearr = arr_get_from_tbl("tbl_site");

$newrow = array();
foreach($sitearr as $key => $value)
{
    //We create a new array with special key for the web to explain.
    $newrow["sitename"] = $value["sitename"];
	$newarr[]=$newrow;    
}

echo json_encode($newarr);
?>

