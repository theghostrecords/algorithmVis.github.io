/**
 * Created by knutandersstokke on 16.10.2016.
 *
 */

declare var $: any;

/** Manager for events stored in queue. Manager is also responsible for executing events automatically */
class eventManager {
    delayTime: number = 1000; // Original value
    nextEvents: FrontendEvent[] = [];
    previousEvents: FrontendEvent[] = [];
    eventThread: number;
    paused: boolean = true;

    // Executing the next event in the queue, adding it to 'previous'
    next() {
        if (this.nextEvents.length == 0) {
            return;
        }
        let event: FrontendEvent = (<FrontendEvent> this.nextEvents.shift());
        event.next();
        this.previousEvents.push(event);
        if (event.duration == 0)
            this.next();
    }

    // Executing the previous event
    previous() {
        this.pause();
        if (this.previousEvents.length == 0)
            return;
        let event: FrontendEvent = (<FrontendEvent> this.previousEvents.pop());
        //this.delayTime = 500; //this line set to 0 caused: when resuming all animations are played out. Intention Delay when stepping backwards.
        event.previous();
        this.nextEvents.unshift(event);
    }

    addEvent(event: FrontendEvent) {
        this.nextEvents.push(event);
    }

    start() {
        let manager = this; // Anonymous functions cannot access this...
        this.paused = false;
        this.eventThread = setInterval(function () {
            manager.next();
        }, manager.delayTime);
    }

    pause() {
        this.paused = true;
        clearInterval(this.eventThread);
    }

    unpause() {
        let manager = this;
        this.paused = false;
        this.eventThread = setInterval(function () {
            manager.next();
        }, manager.delayTime);
    }

    clear() {
        clearInterval(this.eventThread);
        this.nextEvents = [];
        this.previousEvents = [];
    }

    slow() {
        this.delayTime = 1200;
        this.helpSetInterval();
    }

    medium() {
        this.delayTime = 800;
        this.helpSetInterval();
    }

    fast() {
        this.delayTime = 400;
        this.helpSetInterval();
    }

    helpSetInterval() {
        if (!this.paused) {
            this.pause();
            this.start();
        }
    }
}

class FrontendEvent {
    next: Function;
    previous: Function;
    duration: number;

    constructor(n: Function, p: Function, d: number) {
        this.next = n;
        this.previous = p;
        this.duration = d;
    }
}

let manager: eventManager = new eventManager();

/*
/** How to add FrontendEvents to manager
for(var i=0; i<10; i++) {
    var f = function(k) {
        return function() {console.log("Going forward, step " + k);};
    }(i);
    var b = function(k) {
        return function() {console.log("Going backward, step " + k);}
    }(i);
    manager.addEvent(new FrontendEvent(f,b));
}
*/
