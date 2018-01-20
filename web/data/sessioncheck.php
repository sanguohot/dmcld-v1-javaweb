<?php 
session_start(); 
if(!isset($_SESSION['login']))
{
	header('Location:http://172.16.50.75');
}
?>

