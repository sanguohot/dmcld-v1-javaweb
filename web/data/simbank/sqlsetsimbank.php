<?php
require_once "../sessioncheck.php";
require_once "../mysqllib.php";

$webtmparr = json_decode($GLOBALS['HTTP_RAW_POST_DATA']);
if(0 == count($webtmparr))
{
    //exit after delete all;
    del_all_from_tbl("tbl_simbank");
    exit;
}
	
$webarr = create_webarr_when_simbank_set($webtmparr);
if(null == $webarr)
{
    echo "WRONG PARAMETER";
    exit;
}

$sqlarr = create_sqlarr_when_simbank_set();

$webarr0 = build_arr_by_col($webarr, "bankid");
$sqlarr0 = build_arr_by_col($sqlarr,"bankid");

$newarr0 = array_diff($webarr0,$sqlarr0);
$newarr1 = array_diff($sqlarr0,$webarr0);
$newarr2 = array_intersect($webarr0,$sqlarr0);

if(count($newarr0))
{
    if(true != add_new_rows_to_tbl("tbl_simbank",$newarr0,$webarr))
    {
        echo "ADD ERROR";
    }
}

if(count($newarr1))
{
    if(true != del_old_rows_from_tbl("tbl_simbank",$newarr1,$sqlarr))
    {
        echo "DELETE ERROR";
    }
}

if(count($newarr2))
{
    if(true != mod_rows_from_tbl("tbl_simbank",$newarr2,$webarr,$sqlarr))
    {
        echo "MODIFY ERROR";
    }    
}

function create_webarr_when_simbank_set($webtmparr)
{
    $zonearr = arr_get_from_tbl("tbl_roamzone");
    
    $newrow = array();
    $newarr = array();
    foreach($webtmparr as $key => $value)
    {
        //webarr needs some modification.
        foreach($value as $key0 => $value0)
        {
            if(0 == strcmp("roamzonename",$key0))
            {
                $newrow["roamzoneid"] = SearchColVal($zonearr,$value0,"roamzoneid");
                if(null == $newrow["roamzoneid"])
                {
                    return null;
                }
            }
            else if(0 == strcmp("name",$key0))
            {
                $newrow["bankname"] = $value0;
            }
            else if(0 == strcmp("simbanktype",$key0))
            {
                $newrow["type"] = substr($value0,2);
            }          
            else
            {
                $newrow[$key0] = $value0;
            }       
        }
        
        $newarr[]=$newrow;  
    }
 
    return $newarr;
}

function create_sqlarr_when_simbank_set()
{
    $arr = arr_get_from_tbl("tbl_simbank");
    
    $newrow = array();
    $sqlarr = array();
    foreach($arr as $key => $value)
    {
      	$newrow["roamzoneid"] = $value["roamzoneid"];
    	$newrow["bankname"] = $value["bankname"];
    	$newrow["desc"] = $value["desc"];
    	$newrow["bankid"] = $value["bankid"];
        $newrow["type"] = $value["type"];
    	//$newrow["bankmac"] = $value["bankmac"];
        $sqlarr[]=$newrow;
    }
    
    return $sqlarr;
}
?>

