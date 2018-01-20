<?php
require_once "../sessioncheck.php";
require_once "../mysqllib.php";

$webtmparr = json_decode($GLOBALS['HTTP_RAW_POST_DATA']);
if(0 == count($webtmparr))
{
    //exit after delete all;
    del_all_from_tbl("tbl_gateway");
    exit;
}
	
$webarr = create_webarr_when_gateway_set($webtmparr);
if(null == $webarr)
{
    echo "WRONG PARAMETER";
    exit;
}

$sqlarr = create_sqlarr_when_gateway_set();
$webarr0 = build_arr_by_col($webarr, "gwid");
$sqlarr0 = build_arr_by_col($sqlarr,"gwid");

$newarr0 = array_diff($webarr0,$sqlarr0);
$newarr1 = array_diff($sqlarr0,$webarr0);
$newarr2 = array_intersect($webarr0,$sqlarr0);

if(count($newarr0))
{
    if(true != add_new_rows_to_tbl("tbl_gateway",$newarr0,$webarr))
    {
        echo "ADD ERROR";
    }
}

if(count($newarr1))
{
    if(true != del_old_rows_from_tbl("tbl_gateway",$newarr1,$sqlarr))
    {
        echo "DELETE ERROR";
    }
}

if(count($newarr2))
{
    if(true != mod_rows_from_tbl("tbl_gateway",$newarr2,$webarr,$sqlarr))
    {
        echo "MODIFY ERROR";
    }    
}

function create_webarr_when_gateway_set($webtmparr)
{
    $zonearr = arr_get_from_tbl("tbl_roamzone");
    $sitearr = arr_get_from_tbl("tbl_site");   
    $newrow = array();
    $newarr = array();
    foreach($webtmparr as $key => $value)
    {
        //webarr needs some modification.
        foreach($value as $key0 => $value0)
        {
            if(0 == strcmp("roamzonename",$key0))
            {
                $roamzonename = $value0;
            }
            else if(0 == strcmp("sitename",$key0))
            {
                if($roamzonename=="" && $value0=="")
                {
                    $newrow["siteid"] = "";
                }
                else if($roamzonename!="" && $value0!="")
                {
                    $roamzoneid = SearchColVal($zonearr,$roamzonename,"roamzoneid");
                    if(null == $roamzoneid)
                    {
                        return null;
                    } 
                    
                    $siteid = SearchColVal($sitearr,$value0,"siteid");
                    if(null == $siteid)
                    {
                        return null;
                    } 
 
                    $tmp = SearchColVal($sitearr,$siteid,"roamzoneid");
                    if(null == $tmp)
                    {
                        return null;
                    }
                    
                    if(0 != strcmp($roamzoneid,$tmp))
                    {
                        return null;
                    }
                    
                    $newrow["siteid"] = $siteid;                                    
                }
                else
                {
                    return null;
                }
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

function create_sqlarr_when_gateway_set()
{
    $arr = arr_get_from_tbl("tbl_gateway");
    
    $newrow = array();
    $sqlarr = array();
    foreach($arr as $key => $value)
    {
      	$newrow["siteid"] = $value["siteid"];
    	$newrow["name"] = $value["name"];
    	$newrow["gwid"] = $value["gwid"];
    	$newrow["desc"] = $value["desc"];
        $sqlarr[]=$newrow;
    }
    
    return $sqlarr;
}
?>

