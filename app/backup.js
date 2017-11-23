'use strict';

/* Directives */

var tutorialDirectives = angular.module('tutorial.directives', []);

tutorialDirectives.directive('xpathVisualizer', function () {
    return {
        restrict:'A',
        //   require:'^xpathVisualizerSource',
        scope:{
            xpathVisualizerSource:'@', //id of dom element with html to apply xpath on
            xpathVisualizer:'='
        },
        link:function (scope, element, attrs, ctrl) {

            function addTree(walker, destNode) {
                // walk the TreeWalker tree...
                if (walker.firstChild()) {
                    do {
                        // ...and create an output node for every node we find
                        var curNode = walker.currentNode;
                        var newNode;
                        switch (curNode.nodeType) {
                            case Node.ELEMENT_NODE:
                                newNode = document.createElementNS(null, "tag");
                                newNode.setAttribute("name", curNode.nodeName);
                                break;

                            default:
                                newNode = document.createElementNS(null, "text");
                                newNode.setAttribute("value", curNode.nodeValue);
                                break;
                        }
                        if (curNode.marked) {
                            newNode.setAttribute('marked', 'true');
                        }

                        // insert the output node and recursivly walk the children
                        // of every node
                        destNode.appendChild(newNode);
                        addTree(walker, newNode);
                    } while (walker.nextSibling());

                    // don't forget to return the treewalker to it's previous state
                    // before exiting the function
                    walker.parentNode();
                }
            }


            scope.$watch('xpathVisualizer', function () {

                try {
                    element[0].innerHTML = "";

                    var source = document.getElementById(attrs.xpathVisualizerSource);
                    var w = document.createTreeWalker(source, NodeFilter.SHOW_ALL,
                        {
                            acceptNode:function (node) {
                                if (node.nodeType == Node.TEXT_NODE &&
                                    !(/[^\t\n\r ]/.test(node.nodeValue)))
                                    return NodeFilter.FILTER_REJECT;
                                return NodeFilter.FILTER_ACCEPT;
                            }
                        }, true);

                    addTree(w, element[0]);

                    var nodes = document.evaluate(scope.xpathVisualizer, source, null,
                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                        null);

                    element[0].innerHTML = nodes.snapshotLength + attrs.xpathVisualizerSource;

                    for (var i = 0; i < nodes.snapshotLength; ++i) {
                        var elt = nodes.snapshotItem(i);
                        elt.marked = true;
                    }

                } catch (e) {
                }

            });

        }
    }
});
/*

 tutorialDirectives.directive('xpathVisualizerSource', function () {
 return {
 controller:['$scope', function ($scope) {

 }]
 }
 });*/
