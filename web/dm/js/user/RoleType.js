define([],function(){
function isSuper(roleId){
	if(roleId==this.role_super_admin
			|| roleId==this.role_super_user
			|| roleId==this.role_super_finance
			|| roleId==this.role_super_viewer){
		return true;
	}
	return false;
}
function isSuperAdmin(roleId){
	if(roleId==this.role_super_admin){
		return true;
	}
	return false;
}
function isSuperViewer(roleId){
	if(roleId==this.role_super_viewer){
		return true;
	}
	return false;
}
function isDomainAdmin(roleId){
	if(roleId==this.role_domain_admin){
		return true;
	}
	return false;
}
function getDomainAdmin(){
	return this.role_domain_admin;
}
function isSuperFinance(roleId){
	if(roleId==this.role_super_finance){
		return true;
	}
	return false;
}
function isDomainUserWithoutAdmin(roleId){
	if(roleId==this.role_domain_editor
			|| roleId==this.role_domain_operator
			|| roleId==this.role_domain_viewer
			|| roleId==this.role_domain_user01
			|| roleId==this.role_domain_user02
			|| roleId==this.role_domain_user03){
		return true;
	}
	return false;
}
function isDomainUserDef(roleId){
	if(roleId==this.role_domain_user01
			|| roleId==this.role_domain_user02
			|| roleId==this.role_domain_user03){
		return true;
	}
	return false;
}
function isDomainUserDefault(roleId){
	if(roleId==this.role_domain_editor
			|| roleId==this.role_domain_operator
			|| roleId==this.role_domain_viewer){
		return true;
	}
	return false;
}
  return{
	role_super_admin:1,
	role_super_user:2,
	role_domain_admin:3,
	role_domain_editor:4,
	role_domain_operator:5,
	role_domain_viewer:6,
	role_super_finance:7,
	role_super_viewer:8,
	role_domain_user01:9,
	role_domain_user02:10,
	role_domain_user03:11,
	isDomainUserDefault:isDomainUserDefault,
	isDomainUserDef:isDomainUserDef,
	isDomainUserWithoutAdmin:isDomainUserWithoutAdmin,
	isSuperFinance:isSuperFinance,
	getDomainAdmin:getDomainAdmin,
	isDomainAdmin:isDomainAdmin,
	isSuperViewer:isSuperViewer,
	isSuperAdmin:isSuperAdmin,
	isSuper:isSuper
  }
})