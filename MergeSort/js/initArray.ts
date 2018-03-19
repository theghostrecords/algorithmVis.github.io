///<reference path="arrowMethods.ts"/>
///<reference path="MergeSortAlgorithm.ts"/>
declare var $;
declare var javaBinder;

var array;

if (typeof javaBinder != "undefined") {
    console.log = function(msg) {
        javaBinder.print(msg);
    }
}

class ArrayElement {
    left:number;
    id:number;

    constructor(id:number) {
        this.id = id;
    }

    animateLeft(left:number, animTime:number, arrayId:string) {
        this.left = left;
        $("#"+arrayId + this.id).animate({left:left}, animTime);
    }

    changeId(newId:number, arrayId:string) {
        $("#"+arrayId+this.id).stop();
        $("#"+arrayId+this.id).attr("id", arrayId+newId);
        this.id = newId;
    }

    swap(otherElement:ArrayElement, arrayId:string, animTime:number) {

        console.log("Swap: " + this.id + " med " + otherElement.id);

        // Swap Id
        var thisId = this.id;
        var otherId = otherElement.id;
        this.changeId(100, arrayId); // So it doesnt get selected when selecting the other element
        otherElement.changeId(thisId, arrayId);
        this.changeId(otherId, arrayId);

        // Swap position
        var thisLeft = this.left;
        this.animateLeft(otherElement.left, animTime, arrayId);
        otherElement.animateLeft(thisLeft, animTime, arrayId);
    }
}

var arrayElements = new Array;

function getArrayElement(id:number) {
    if (id < 0 || id >= arrayElements.length) {
        console.log("Illegal argument for getArrayElement: " + id);
        return;
    }
    return arrayElements.filter(function(elem:ArrayElement) { return elem.id == id } )[0];
}

function setMyArray(jsonArray : string) {
    array = JSON.parse(jsonArray);
    arrayElements = [];

    // Remove elements
    $("#arrayUl li, #indices p").each(function () {
        $(this).remove();
    });

    for (var i = 0; i < array.length; i++) {
        $("#indices").append("<p id='ind" + i + "' >" + i + "</p>");
        $("#arrayUl").append("<li id='insElemNr" + i + "'><div>" + array[i] + "</div></li>");
        arrayElements.push(new ArrayElement(i));
    }

    // Spreading elements horizontally
    $(document).ready(function () {
        for (var i = 0; i < array.length; i++) {
            var left = (i * 85);
            var indLeft = (left+7) - (i > 9 ? 7 : 0);
            $("#ind" + i).animate({left: indLeft+"px"}, 1000)
            arrayElements[i].animateLeft(left, 1000, "insElemNr");
        }
    });



    // Center elements
    centerElements();
    $(window).resize(centerElements());
    setupArrows();

}

function centerElements() {
    var arrayWidth = ((array.length-1) * 85) + 50;
    var left = -arrayWidth/2 + 20;
    $("#indices").animate({left: (left) + "px"}, 500);
    $("#arrayUl").animate({left: left + "px"}, 500); // +20? Ul is default 40px -> 40/2 = 20. Don't touch.
    $("svg#k-svg").animate({left: (left-7) + "px"}, 500);
    $("#rightBracket").animate({left : (arrayWidth + 15) + "px"}, 600);
}


/**
 * This bricks the visualisation of the right array because it makes a new one.
if (typeof javaBinder !== 'undefined') {
    javaBinder.setRandomArray();
} else {
    $(document).ready(function() {
        //getArray("random");

    });
}
 */

function returnArray() {
    return array;
}

function getArray(ran) {
// Setting Random array
    if (ran === "random") {
        //array = setRandomMyArray();
        array = [4, 1, 10, 7, 3, 5, 20, 15, 2, 21];
    }
    else if (ran === "sorted") {
        array = setSortedArray();
    }
    else if (ran === "inverted") {
        array = setInvSortedArray();
    }
    else if (ran === "almostSorted") {
        array = setAlmostSortedArray();
    }
    else { // If page is tested in another browser
        array = ('14|17|19|18|7|17|15|5');
    }

    if (checkDupli(array)) {
        return getArray(ran);
    } else {
        viewer.serializeArray(array);
        setMyArray(JSON.stringify(array));
    }
}

function checkDupli(arr : number[]) {
    for(let i = 0; i <= arr.length; i++) {
        for(let j = i; j <= arr.length; j++) {
            if(i != j && arr[i] == arr[j]) {
                return true;
            }
        }
    }
    return false;
}