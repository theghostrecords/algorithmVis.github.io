/**
 * File created by Kenneth Apeland 03.02.18.
 */
///<reference path="view.ts"/>
///<reference path="IAlgorithm.ts"/>
let iColor = 2;
let jColor = 0;

class controller {

    //algorithm og methodToUse skal ikke være string, men dei e det for nå
    //programmet vil ikje fungere
    private algorithm: IAlgorithm;
    private methodToUse: string = "Union";
    private speed: number;

    initController(algo: IAlgorithm) {
        this.algorithm = algo;
        this.speed = 50;
        viewer.displayThisArray(this.algorithm.getArray());
    }

    changeSpeed(newSpeed: number) {
        this.speed = newSpeed;
    }

    getSpeed() {
        return this.speed;
    }

    connected(firstIndex: number, secondIndex: number) {
        viewer.screenLock(true);
        //Kossen gjør eg detta?? - fixed tror jeg
        this.algorithm.connected(firstIndex, secondIndex);
        viewer.screenLock(false);
    }

    union(firstIndex: number, secondIndex: number) {
        viewer.screenLock(true);
        //samme som over - fixed tror jeg
        this.algorithm.union(firstIndex, secondIndex);
        viewer.screenLock(false);
    }

    find(index: number) {
        viewer.screenLock(true);
        //SEND HELP PLEASE
        this.algorithm.find(index);
        viewer.screenLock(false);
    }

    setArrow(index: number) {
        viewer.setThisArrow(index);
    }

    setSelectedIndex(index: number, select: boolean) {
        viewer.selectThisIndex(index, select);
    }

    setValueAtIndex(i: number, bValue: number) {
        viewer.setValueAtThisIndex(i, bValue);
    }

    connectNodes(child: number, parent: number) {
        viewer.connectThisNodes(child, parent);
    }

    highlightNode(index: number, color: string) {
        viewer.highlightThisNode(index, color);
    }

    invertPauseState() {
        this.algorithm.invertPause();
    }

    setAlgorithm(algo: IAlgorithm) {
        this.algorithm = algo;
    }

    removeHighlight(node: number) {
        viewer.removeThisHighlight(node);
    }

    setMethodToUse(methodToUse: string) {
        this.methodToUse = methodToUse;
    }

    getNameOfCurrentAlgorithm() {
        return this.algorithm;
    }

    getArrayClone() {
        return this.algorithm.getArray().slice(0, this.algorithm.getArray().length);
    }

    setArray(array: number[]) {
        this.algorithm.setArray(array);
    }

    checkMark(aIndex: number, bIndex: number, set: boolean) {
        viewer.checkMark(aIndex, bIndex, set);
    }

    redCross(aIndex: number, bIndex: number, set: boolean) {
        viewer.redCross(aIndex, bIndex, set);
    }

    displaySize(root: number, size: number) {
        viewer.displayNodeSize(root, size);
    }

    saveState(arr: number[]) {
        viewer.executeSaveMethodInJavaScript(this.getArrayClone());
    }
}

var control: controller = new controller();

