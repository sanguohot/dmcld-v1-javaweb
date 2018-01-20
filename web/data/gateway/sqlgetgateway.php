<?php
require_once "../sessioncheck.php";
require_once "../mysqllib.php";

$sitearr = arr_get_from_tbl("tbl_site");
$zonearr = arr_get_from_tbl("tbl_roamzone");
$sqlarr = arr_get_from_tbl("tbl_gateway");
$newrow = array();
foreach($sqlarr as $key => $value)
{
    //We create a new array with special key for the web to explain.
    if($value["siteid"]=="")
    {
        $newrow["roamzonename"] = null;
        $newrow["sitename"] = null;
    }
    else
    {
        $tmp = SearchColVal($sitearr,$value["siteid"],"roamzoneid");
        if(null == $tmp)
        {
            $newrow["roamzonename"] = null;
            $newrow["sitename"] = null;           
        }
        else
        {
        	$newrow["roamzonename"] = SearchColVal($zonearr,$tmp,"roamzonename");
            $newrow["sitename"] = SearchColVal($sitearr,$value["siteid"],"sitename");
            if(null==$newrow["roamzonename"] || null==$newrow["sitename"])
            {
                $newrow["roamzonename"] = null;
                $newrow["sitename"] = null;
            }
        }        
    }

	$newrow["name"] = $value["name"];
    $newrow["gwid"] = $value["gwid"];
    $newrow["type"] = $value["type"];
	$newrow["desc"] = $value["desc"];
	$newrow["createtime"] = $value["createtime"];
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
