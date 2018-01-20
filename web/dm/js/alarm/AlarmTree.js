/**
 * Created by Rainc on 2015/3/21.
 */
define(["tree"],function(tree){
  

  function loadTree(){
    $.ajax({ url: "dmManager!getAlarmTree.action", complete: function(data,str){
      if(data && data.responseJSON && data.responseJSON.dmTree){
    	  var tmp=data.responseJSON.dmTree;
          window.alarmTreeCache=tmp;
          window.curTreeNode=tmp;
          window.treeCache=tmp;
          window.limit=18;
          window.start=0;
          window.treeStatus="collapse";
          tree.update(tmp,tmp,"my_position");
//          tree.createTree(data.responseJSON.dmTree);
      }
    }});
  }

  return{
	loadTree:loadTree,
    getTreePara:tree.getTreePara
  }
})
