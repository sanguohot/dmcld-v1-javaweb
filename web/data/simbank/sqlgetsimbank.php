<?php
require_once "../sessioncheck.php";
require_once "../mysqllib.php";

$zonearr = arr_get_from_tbl("tbl_roamzone");
$sqlarr = arr_get_from_tbl("tbl_simbank");
$newrow = array();
foreach($sqlarr as $key => $value)
{
    //We create a new array with special key for the web to explain.
	$newrow["roamzonename"] = SearchColVal($zonearr,$value["roamzoneid"],"roamzonename");
	$newrow["name"] = $value["bankname"];
	$newrow["desc"] = $value["desc"];
	$newrow["bankid"] = $value["bankid"];
	$newrow["simbanktype"] = "bk".$value["type"];
	//$newrow["bankmac"] = $value["bankmac"];
	if(0 == strcmp($value["status"],"1"))
	{
		$newrow["status"] = "linked";
	}
	else if(0 == strcmp($value["status"],"2"))
	{
		$newrow["status"] = "online";
	}
	else
	{
		$newrow["status"] = "offline";
	}
	$newarr[]=$newrow;    
}

echo json_encode($newarr);
?> 
