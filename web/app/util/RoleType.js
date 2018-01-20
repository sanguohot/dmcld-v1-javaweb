Ext.define('app.util.RoleType',{
	role_super_admin:1,
	role_super_user:2,
	role_domain_admin:3,
//	role_domain_user:4,
	role_domain_editor:4,
	role_domain_operator:5,
	role_domain_viewer:6,
	role_super_finance:7,
	role_super_viewer:8,
	role_domain_user01:9,
	role_domain_user02:10,
	role_domain_user03:11,
	isSuper:function(roleId){
		if(roleId==this.role_super_admin
				|| roleId==this.role_super_user
				|| roleId==this.role_super_finance
				|| roleId==this.role_super_viewer){
			return true;
		}
		return false;
	},
	isSuperAdmin:function(roleId){
		if(roleId==this.role_super_admin){
			return true;
		}
		return false;
	},
	isSuperViewer:function(roleId){
		if(roleId==this.role_super_viewer){
			return true;
		}
		return false;
	},
	isDomainAdmin:function(roleId){
		if(roleId==this.role_domain_admin){
			return true;
		}
		return false;
	},
	getDomainAdmin:function(){
		return this.role_domain_admin;
	},
	isSuperFinance:function(roleId){
		if(roleId==this.role_super_finance){
			return true;
		}
		return false;
	},
//	isDomainUser:function(roleId){
//		if(roleId==this.role_domain_user){
//			return true;
//		}
//		return false;
//	},
	isDomainUserWithoutAdmin:function(roleId){
		if(roleId==this.role_domain_editor
				|| roleId==this.role_domain_operator
				|| roleId==this.role_domain_viewer
				|| roleId==this.role_domain_user01
				|| roleId==this.role_domain_user02
				|| roleId==this.role_domain_user03){
			return true;
		}
		return false;
	},
	isDomainUserDef:function(roleId){
		if(roleId==this.role_domain_user01
				|| roleId==this.role_domain_user02
				|| roleId==this.role_domain_user03){
			return true;
		}
		return false;
	},
	isDomainUserDefault:function(roleId){
		if(roleId==this.role_domain_editor
				|| roleId==this.role_domain_operator
				|| roleId==this.role_domain_viewer){
			return true;
		}
		return false;
	},
	getValueMapItem:function(param){
		var map = this.getValueMap();
		var ret=map.get(param);
		return ret?ret:param;
	},
	getDisplayMapItem:function(param){
		var map = this.getDisplayMap();
		var ret=map.get(param);
		return ret?ret:param;
	},
	getValueMap:function(){
		map.put("domain_editor",this.role_domain_editor+"");
		map.put("domain_viewer",this.role_domain_viewer+"");
		map.put("domain_operator",this.role_domain_operator+"");
		map.put("domain_user01",this.role_domain_user01+"");
		map.put("domain_user02",this.role_domain_user02+"");
		map.put("domain_user03",this.role_domain_user03+"");
		map.put("domain_admin",this.role_domain_admin+"");
		map.put("super_finance",this.role_super_finance+"");
		map.put("super_admin",this.role_super_admin+"");
		map.put("super_viewer",this.role_super_viewer+"");
		map.put("super_user",this.role_super_user+"");
	},
	getDisplayMap:function(){
		var map = rs.getMap();				
		map.put(this.role_domain_editor+"","domain_editor");
		map.put(this.role_domain_viewer+"","domain_viewer");
		map.put(this.role_domain_operator+"","domain_operator");
		map.put(this.role_domain_user01+"","domain_user01");
		map.put(this.role_domain_user02+"","domain_user02");
		map.put(this.role_domain_user03+"","domain_user03");
		map.put(this.role_domain_admin+"","domain_admin");
		map.put(this.role_super_finance+"","super_finance");
		map.put(this.role_super_admin+"","super_admin");
		map.put(this.role_super_viewer+"","super_viewer");
		map.put(this.role_super_user+"","super_user");
		return map;
	},
	getDisplayList:function(roles){
		var tmp=roles.split(",");
		var ret="";
		for(var i=0;i<tmp.length;i++){
			if(ret!=""){
				ret=ret+",";
			}
			ret=ret+this.getDisplayMapItem(tmp[i]);
		}
		return ret;
	},
});
