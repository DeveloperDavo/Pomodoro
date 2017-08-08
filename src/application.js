'use strict';

function Application() {
    var DECREMENT = false;
    var INCREMENT = true;

    function updateTimerOnClick(crementButton, timerElement, isIncrement) {
        crementButton.click(function () {
            var time = Number(timerElement.text());
            var newTime = isIncrement ? time + 1 : time - 1;
            timerElement.text(newTime);
        })
    }

    function decrementBreakTimerOnClick() {
        updateTimerOnClick($("#decrement-break"), $("#break-timer"), DECREMENT);
    }

    function incrementBreakTimerOnClick() {
        updateTimerOnClick($("#increment-break"), $("#break-timer"), INCREMENT);
    }

    function incrementSessionTimerOnClick() {
        updateTimerOnClick($("#increment-session"), $("#session-timer"), INCREMENT);
    }

    function decrementSessionTimerOnClick() {
        updateTimerOnClick($("#decrement-session"), $("#session-timer"), DECREMENT);
    }

    this.init = function () {
        decrementBreakTimerOnClick();
        incrementBreakTimerOnClick();
        incrementSessionTimerOnClick();
        decrementSessionTimerOnClick();
    };
}
