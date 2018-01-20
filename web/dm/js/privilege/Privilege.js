define(function(){
	function procPrivilegeEdit(no_tip){
		 var flag=1;
		 if(window.roleTypeObj.rightDomainEdit!=1){
			 if(!no_tip){
				 window.tip.show_pk("warning",null,window.lc.getValue("notLegal"));
			 }				
				return flag;
			}else {
				return 0;
			}
	}
		
 function procPrivilegeOper(no_tip){
	 var flag=1;
	 if(window.roleTypeObj.rightDomainAction!=1){
		 if(!no_tip){
			 window.tip.show_pk("warning",null,window.lc.getValue("notLegal"));
		 }
			return flag;
			
		}else {
			return 0;
		}
 }
 function procPrivilegeUser(row){
	if(!row || !row.uuid || !row.roleId){
		return false;
	}else if(window.user.uuid==row.uuid){
		return true;
	}else if(window.roleType.isSuper(row.roleId) && !window.roleType.isSuper(window.user.roleId)){
		return false;
	}else if(window.roleType.isSuperAdmin(row.roleId) && !window.roleType.isSuperAdmin(window.user.roleId)){
		return false;
	}else if(window.roleType.isDomainAdmin(row.roleId) && !window.roleType.isSuper(window.user.roleId)){
		return false;
	}else{
		return true;
	}
 }
	return {
		procPrivilegeEdit:procPrivilegeEdit,
		procPrivilegeOper:procPrivilegeOper,
		procPrivilegeUser:procPrivilegeUser
	}
	
})