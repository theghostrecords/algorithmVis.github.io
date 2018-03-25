/**
 * File created by Philip Hoang 21.03.2018
 */
///<reference path="graphUI.ts"/>
///<reference path="View.ts"/>
///<reference path="KruskalAlgorithm.ts"/>
///<reference path="View.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="Methods.ts"/>
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.prototype.addNode = function (x, y) {
        viewer.addNodeToGraph(x, y);
    };
    Controller.prototype.connectTwoNodes = function (node1, node2) {
        viewer.connectTheseNodes(node1, node2);
    };
    Controller.prototype.resetGraph = function () {
        viewer.resetAll();
    };
    Controller.prototype.highlightMyEdge = function (edgeId) {
        viewer.setHighlightEdge(edgeId);
    };
    Controller.prototype.dehighlightMyEdge = function (edgeId) {
        viewer.setDehighlightEdge(edgeId);
    };
    Controller.prototype.removeMyEdge = function (edgeId) {
        viewer.removeEdge(edgeId);
    };
    Controller.prototype.transparentMyEdge = function (edgeId) {
        viewer.transparentEdge(edgeId);
    };
    Controller.prototype.detransparentMyEdge = function (edgeId) {
        viewer.transparentEdge(edgeId);
    };
    Controller.prototype.selectTwoNodes = function (node1, node2) {
        viewer.selectTheseNodes(node1, node2);
    };
    Controller.prototype.deselectTwoNodes = function (node1, node2) {
        viewer.deselectTheseNodes(node1, node2);
    };
    Controller.prototype.disableStartButton = function () {
        viewer.disableThisButton();
    };
    Controller.prototype.enableStartButtion = function () {
        viewer.enableThisButton();
    };
    return Controller;
}());
var controller = new Controller();