/**
     * Creates an XPath from a node (currently not used inside this Class (instead FormHTML.prototype.generateName is used) but will be in future);
     * @param  {string=} rootNodeName	if absent the root is #document
     * @return {string}                 XPath
     */
    $.fn.getXPath = function(rootNodeName){
		//other nodes may have the same XPath but because this function is used to determine the corresponding input name of a data node, index is not included 
		var position,
			$node = this.first(),
			nodeName = $node.prop('nodeName'),
			$sibSameNameAndSelf = $node.siblings(nodeName).addBack(),
			steps = [], 
			$parent = $node.parent(),
			parentName = $parent.prop('nodeName');

		position = ($sibSameNameAndSelf.length > 1) ? '['+($sibSameNameAndSelf.index($node)+1)+']' : '';
		steps.push(nodeName+position);

		while ($parent.length == 1 && parentName !== rootNodeName && parentName !== '#document'){
			$sibSameNameAndSelf = $parent.siblings(parentName).addBack();
			position = ($sibSameNameAndSelf.length > 1) ? '['+($sibSameNameAndSelf.index($parent)+1)+']' : '';
			steps.push(parentName+position);
			$parent = $parent.parent();
			parentName = $parent.prop('nodeName');
		}
		return '/'+steps.reverse().join('/');
	};