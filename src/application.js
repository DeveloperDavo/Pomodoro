'use strict';

function Application() {
    var DECREMENT = false;
    var INCREMENT = true;

    function getNewBreakTime(timer, isIncrement) {
        if (isIncrement) {
            return timer + 1;
        } else {
            return timer - 1;
        }
    }

    function updateBreakTimerText(isIncrement) {
        var breakTimerElement = $("#break-timer");
        var breakTimer = Number(breakTimerElement.text());
        breakTimerElement.text(getNewBreakTime(breakTimer, isIncrement));
    }

    function decrementBreakTimerOnClick() {
        $("#decrement-break").click(function () {
            updateBreakTimerText(DECREMENT);
        })
    }

    function incrementBreakTimerOnClick() {
        $("#increment-break").click(function () {
            updateBreakTimerText(INCREMENT);
        })
    }

    function incrementSessionTimerOnClick() {
        $("#increment-session").click(function () {
            $("#session-timer").text("26");
        })

    }

    this.init = function () {
        decrementBreakTimerOnClick();
        incrementBreakTimerOnClick();
        incrementSessionTimerOnClick();
    };
}
