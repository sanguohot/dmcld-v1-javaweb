<?php
require_once "sessioncheck.php";
function get_mac_decimal($mac) {
    $clear_mac = preg_replace('/[^0-9A-F]/i','',$mac);
    $mac_decimal = array();
    for ($i = 0; $i < strlen($clear_mac); $i += 2 ):
        $mac_decimal[] = hexdec(substr($clear_mac, $i, 2));
    endfor;
    return $mac_decimal;
}	
function StrToArr($str)
{
	$tmp = $str;
	if($tmp == "")
	{
		exit("HTTP_RAW_POST_DATA has no data!!!");
	}
	$tmp = trim($tmp);
	$arr =  str_replace("[","", $tmp);
	$arr =  str_replace("]","", $arr);
	$arr =  str_replace("{","", $arr);
	$arr =  str_replace("},","/", $arr);
	$arr =  str_replace("}","", $arr);
	$arr =  explode("/",$arr);
	if($arr==FALSE || $arr==false)
	{
		exit("Error when explode data!!!");
	}
	
	
	foreach($arr as $key0 => $value0)
	{
		$newarr = array();
		
		$tmparr = explode(",",$value0);
		
		if($tmparr==FALSE || $tmparr==false)
		{
			exit("Error when explode data!!!");
		}
	
		foreach($tmparr as $key1 => $value1)
		{
			$pos = strpos($value1,":");
			if($pos==false || $pos==FALSE || $pos==0)
			{
				exit("Error when strpos data with $pos!!!");
			}
			
			$key2 = substr($value1,0,$pos);
			$value2 = substr($value1,$pos+1);
			$newarr[$key2] = $value2;
		}
		$arr[$key0] = $newarr;	
	}
	
	return $arr;
}

function SearchRow($arr,$val)
{
    $flag = 0;
	foreach($arr as $key => $value)
	{
		foreach($value as $key0 => $value0)
		{
			if(0 == strcmp($val,$value0))
			{
				$flag = 1;
				break;
			}
		}
        
        if($flag)
		{
			break;
		}
	}
    
    if($flag)
    {
        return $arr[$key];
    }
    
    return null;
}

function SearchColVal($arr,$val,$col)
{
    $ret = SearchRow($arr,$val);
    if(null == $ret)
    {
        return null;
    }
	
	foreach($ret as $key => $value)
	{
		if(0 == strcmp($col,$key))
		{
			return $value;
		}			
	}
	
	return null;
}

function build_arr_by_col($arr,$col)
{
	$ModArray = array();
	$i = 0;
	foreach($arr as $key => $value)
	{
		foreach($value as $key0 => $value0)
		{
			if(0 == strcmp($col,$key0))
			{
				$ModArray[$i] = $value0;
				echo $i."-".$value0."<br />";
				$i++;
			}
		}
	}

	return $ModArray;
}

function arr_get_from_tbl($tablename)
{
    $con=mysql_connect("localhost","root","111111");
    if (!$con)
    {
    	die('Could not connect: ' . mysql_error());
    }
    mysql_select_db("simserver", $con);
    $query="select * from $tablename";
    $ret=mysql_query($query);
    while($row=mysql_fetch_array($ret))
    {
    	$arr[]=$row;
    }
    
    mysql_close($con);
 
    return $arr;
}

function add_new_rows_to_tbl($tbl,$rows,$webarr)
{
    $con=mysql_connect("localhost","root","111111");
    if (!$con)
    {
    	die('Could not connect: ' . mysql_error());
    }
    mysql_select_db("simserver", $con);
    
    if(0 == strcmp($tbl,"tbl_simbank"))
    {
        foreach($rows as $key => $value)
        {
            if($value == "")
            {
                return false;
            }
            
        	$roamzoneid = SearchColVal($webarr,$value,"roamzoneid");
            $type = SearchColVal($webarr,$value,"type");
            $domain = 1;           
            if(null==$roamzoneid || null==$type || null==$domain
                || ""==$roamzoneid || ""==$type || ""==$domain)
            {
                return false;
            }
            
            $desc = SearchColVal($webarr,$value,"desc");
            $bankname = SearchColVal($webarr,$value,"bankname");
        	$tmp="INSERT INTO $tbl (roamzoneid,domain,type,bankid,bankname,$tbl.desc) 
            VALUES ('$roamzoneid','$domain','$type','$value','$bankname','$desc')";
        	if(!mysql_query($tmp))
        	{
        		die('Could not add: ' . mysql_error());
        	}
        }        
    }
    else if(0 == strcmp($tbl,"tbl_gateway"))
    {
        foreach($rows as $key => $value)
        {
            if($value == "")
            {
                return false;
            }
            
            $domain = 1;           
            if(null==$domain || ""==$domain)
            {
                return false;
            }
        	$tmp="INSERT INTO $tbl ($tbl.gwid,$tbl.domain) 
            VALUES ('$value','$domain')";
        	if(!mysql_query($tmp))
        	{
        		die('Could not add: ' . mysql_error());
        	} 
                       
            $siteid = SearchColVal($webarr,$value,"siteid");
            if($siteid != "")
            {
                $tmp = "UPDATE $tbl SET $tbl.siteid = '$siteid' WHERE $tbl.gwid = '$value'";
                if(!mysql_query($tmp))
            	{
            		die('Could not modify: ' . mysql_error());
            	}
            }
            $name = SearchColVal($webarr,$value,"name");
            if($name != "")
            {
                $tmp = "UPDATE $tbl SET $tbl.name = '$name' WHERE $tbl.gwid = '$value'";
                if(!mysql_query($tmp))
            	{
            		die('Could not modify: ' . mysql_error());
            	}
            }            
            $desc = SearchColVal($webarr,$value,"desc");
            if($desc != "")
            {
                $tmp = "UPDATE $tbl SET $tbl.desc = '$desc' WHERE $tbl.gwid = '$value'";
                if(!mysql_query($tmp))
            	{
            		die('Could not modify: ' . mysql_error());
            	}
            }
        }         
    }
    mysql_close($con);
    
    return true; 
}

function mod_rows_from_tbl($tbl,$rows,$webarr,$sqlarr)
{
    $con = mysql_connect("localhost","root","111111");
    if (!$con)
    {
    	die('Could not connect: ' . mysql_error());
    }
    mysql_select_db("simserver", $con);
    
    if(0 == strcmp($tbl,"tbl_simbank"))
    {
        foreach($rows as $key => $value)
        {
            if($value == "")
            {
                return false;
            }
            
            $web = SearchRow($webarr,$value);
            $sql = SearchRow($sqlarr,$value);
            if(null==$web || null==$sql)
            {
                return false;
            }
            
            foreach($web as $key0 => $value0)
            {
                if(0 == strcmp($value, $value0))
                {
                    continue;
                }
                else
                {
                    if(0!=strcmp($key0,"roamzoneid")
                        && 0!=strcmp($key0,"type")
                        && 0!=strcmp($key0,"bankname")
                        && 0!=strcmp($key0,"desc"))
                    {
                        continue;
                    }
                    
                    if(0 != strcmp($value0,$sql[$key0]))
                    {
                        $tmp = "UPDATE $tbl SET $tbl.$key0 = '$value0' WHERE bankid = '$value'";
                        if(!mysql_query($tmp))
                    	{
                    		die('Could not modify: ' . mysql_error());
                    	}
                    }
                }
            } 
        }        
    }
    if(0 == strcmp($tbl,"tbl_gateway"))
    {
        foreach($rows as $key => $value)
        {
            if($value == "")
            {
                return false;
            }
            
            $web = SearchRow($webarr,$value);
            $sql = SearchRow($sqlarr,$value);
            if(null==$web || null==$sql)
            {
                return false;
            }
            
            foreach($web as $key0 => $value0)
            {
                if(0 == strcmp($value, $value0))
                {
                    continue;
                }
                else
                {
                    if(0!=strcmp($key0,"siteid")
                        && 0!=strcmp($key0,"name")
                        && 0!=strcmp($key0,"desc"))
                    {
                        continue;
                    }
                    
                    if(0 != strcmp($value0,$sql[$key0]))
                    {
                        $tmp = "UPDATE $tbl SET $tbl.$key0 = '$value0' WHERE $tbl.gwid = '$value'";
                        if(!mysql_query($tmp))
                    	{
                    		die('Could not modify: ' . mysql_error());
                    	}
                    }
                }
            } 
        }        
    }    
    mysql_close($con); 
    return true;
}

function del_old_rows_from_tbl($tbl,$rows)
{
    $con=mysql_connect("localhost","root","111111");
    if (!$con)
    {
    	die('Could not connect: ' . mysql_error());
    }
    mysql_select_db("simserver", $con);
    
    if(0 == strcmp($tbl,"tbl_simbank"))
    {
        foreach($rows as $key => $value)
        {
            if($value == "")
            {
                return false;
            }
                       
        	$tmp="DELETE FROM $tbl WHERE bankid = '$value'";
        	if(!mysql_query($tmp))
        	{
        		die('Could not delete: ' . mysql_error());
        	}
        }        
    }
    if(0 == strcmp($tbl,"tbl_gateway"))
    {
        foreach($rows as $key => $value)
        {
            if($value == "")
            {
                return false;
            }
                       
        	$tmp="DELETE FROM $tbl WHERE $tbl.gwid = '$value'";
        	if(!mysql_query($tmp))
        	{
        		die('Could not delete: ' . mysql_error());
        	}
        }        
    }    
    mysql_close($con);
    return true;
}

function  del_all_from_tbl($tblname)
{
    $con = mysql_connect("localhost","root","111111");
    if (!$con)
    {
    	die('Could not connect: ' . mysql_error());
    }
    mysql_select_db("simserver", $con);
	$tmp="DELETE FROM $tblname";
	if(!mysql_query($tmp))
	{
		die('Could not delete: ' . mysql_error());
	}
    
    mysql_close($con);    
}

function dimensional_array_show_key_and_value($arr)
{
    foreach($arr as $key => $value)
    {
        foreach($value as $key0 => $value0)
        {
            echo $key0.":".$value0." ";
        }           
    }
}
?>

