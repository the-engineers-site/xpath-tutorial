'use strict';

/* Directives */

var tutorialDirectives = angular.module('tutorial.directives', []);

tutorialDirectives.directive('htmlVisualizer', function () {
    return {
        restrict:'A',
        scope:{
            source:'@', //id of dom element with html to apply xpath on
            expectedSelection:'=',
            currentSelection:'=',
            isMatch:'='
        },

        link:function (scope, element) {

            scope.$watch('[currentSelection, expectedSelection]', function () {
                try {

                    var source = document.getElementById(scope.source);
                    var nodesExpectedSelection = evaluateXpathOnSource(scope.expectedSelection, source);
                    var nodesCurrentSelection = evaluateXpathOnSource(scope.currentSelection, source);

                    markInputNodesForMatch(nodesExpectedSelection, 'false');

                    markInputNodesForExpectedSelection(nodesExpectedSelection, 'true');
                    markInputNodesForCurrentSelection(nodesCurrentSelection, 'true');

                    createTreeWalker(source);

                    markInputNodesForCurrentSelection(nodesCurrentSelection, 'false');
                    // markInputNodesForExpectedSelection(nodesExpectedSelection, false);

                    if(scope.currentSelection == "")
                        scope.isMatch = false
                    else
                        scope.isMatch = isAMatch(nodesExpectedSelection, nodesCurrentSelection);

                    if (scope.isMatch) {
                        markInputNodesForMatch(nodesExpectedSelection, 'true');
                    }

                } catch (e) {
                }
            }, true);

            function isAMatch(nodesExpectedSelection, nodesCurrentSelection) {
                var match = false
                if (nodesExpectedSelection.snapshotLength == nodesCurrentSelection.snapshotLength) {
                    match = true
                    for (var i = 0; i < nodesExpectedSelection.snapshotLength; ++i) {
                        if (nodesExpectedSelection.snapshotItem(i) != nodesCurrentSelection.snapshotItem(i)) {
                            match = false;
                            break;
                        }
                    }
                }
                return match;
            }

            function evaluateXpathOnSource(xpath, source) {
                if (xpath == "")
                    xpath = "/";
                return document.evaluate(xpath, source, null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                    null);
            }

            function markInputNodesForExpectedSelection(nodes, value) {
                for (var i = 0; i < nodes.snapshotLength; ++i) {
                    var elt = nodes.snapshotItem(i);
                    if (elt.setAttribute) {
                        elt.setAttribute("expectedSelect", value)
                    } else {
                        elt.expectedSelect = value;
                    }
                }
            }

            function markInputNodesForMatch(nodes, value) {
                for (var i = 0; i < nodes.snapshotLength; ++i) {
                    var elt = nodes.snapshotItem(i);
                    if (elt.setAttribute) {
                        elt.setAttribute("match", value)
                    } else {
                        elt.match = value;
                    }
                }
            }

            function markInputNodesForCurrentSelection(nodes, value) {
                for (var i = 0; i < nodes.snapshotLength; ++i) {
                    var elt = nodes.snapshotItem(i);
                    if (elt.setAttribute) {
                        elt.setAttribute("actualSelect", value)
                    } else {
                        elt.actualSelect = value;
                    }
                }
            }

            function markOutputNodesForExpectedXpath(currentNode, newNode) {
                var expectedSelect = currentNode.expectedSelect;
                if (currentNode.getAttribute) {
                    expectedSelect = currentNode.getAttribute("expectedSelect");
                }
                if (expectedSelect == 'true') {
                    newNode.setAttribute('expectedSelect', 'true');
                } else {
                    newNode.setAttribute('expectedSelect', 'false');
                }
                return newNode;
            }

            function markOutputNodesForCurrentXpath(currentNode, newNode) {
                var actualSelect = currentNode.actualSelect;
                if (currentNode.getAttribute) {
                    actualSelect = currentNode.getAttribute("actualSelect");
                }
                if (actualSelect == 'true') {
                    newNode.setAttribute('actualSelect', 'true');
                } else {
                    newNode.setAttribute('actualSelect', 'false');
                }
                return newNode;
            }

            function createTreeWalker(source) {

                element[0].innerHTML = "";

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

            }

            function addTree(walker, destNode) {
                // walk the TreeWalker tree...
                if (walker.firstChild()) {
                    do {
                        //create an output node for every node we find
                        var currentNode = walker.currentNode;
                        var newNode;
                        switch (currentNode.nodeType) {
                            case Node.ELEMENT_NODE:
                                newNode = document.createElement("div");
                                newNode.className = "tag";
                                newNode.innerHTML = "<div>&lt;" + currentNode.nodeName.toString().toLowerCase() + "<span class='attributes'>" + addAttributesToNode(currentNode) + "</span> &gt;</div>";
                                break;
                            default:
                                newNode = document.createElement("div");
                                newNode.className = "text";
                                newNode.innerHTML = "#" + currentNode.nodeValue;
                                break;
                        }

                        newNode = markOutputNodesForExpectedXpath(currentNode, newNode);
                        newNode = markOutputNodesForCurrentXpath(currentNode, newNode);

                        // insert the output node and recursivly walk the children
                        // of every node
                        destNode.appendChild(newNode);

                        addTree(walker, newNode);
                        if (currentNode.nodeType == Node.ELEMENT_NODE)
                            newNode.innerHTML += "<div>&lt;/" + currentNode.nodeName.toString().toLowerCase() + "&gt;</div>";

                    } while (walker.nextSibling());

                    // return the treewalker to it's previous state
                    // before exiting the function
                    walker.parentNode();
                }
            }

            function addAttributesToNode(node) {
                if (hasCustomAttributes(node)) {
                    var attributes = " [ "

                    if (node.getAttribute("type") != null)
                        attributes += "<span class='attributeName'> type =  </span>'" + node.getAttribute("type") + "'  ";
                    if (node.className != '')
                        attributes += "<span class='attributeName'>class = </span>'" + node.className + "'  ";
                    if (node.id != '')
                        attributes += "<span class='attributeName'> id =  </span>'" + node.id + "'  ";
                    if (node.getAttribute("selected") != null)
                        attributes += "<span class='attributeName'> selected =  </span>'" + node.getAttribute("selected") + "'  ";
                    if (node.getAttribute("checked") != null)
                        attributes += "<span class='attributeName'> checked =  </span>'" + node.getAttribute("checked") + "'  ";

                    attributes += ']'
                    return attributes;
                } else {
                    return ""
                }
            }

            function hasCustomAttributes(node) {
                return (node.className != '' || node.id != '' || node.getAttribute("type") != null || node.getAttribute("selected") != null || node.getAttribute("checked") != null)
            }
        }
    }
});
