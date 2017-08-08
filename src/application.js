'use strict';

function Application() {
    var DECREMENT = false;
    var INCREMENT = true;

    var $SESSION_TIMER = $("#session-timer");

    function updateTimerOnClick(crementButton, timerElement, isIncrement) {
        crementButton.click(function () {
            var time = Number(timerElement.text());
            var newTime = isIncrement ? time + 1 : time - 1;
            timerElement.text(newTime);
            if (timerElement === $SESSION_TIMER) {
                $("#clock-time").text("26");
            }
        })
    }

    this.init = function () {

        var $break = $("#break-timer");
        updateTimerOnClick($("#decrement-break"), $break, DECREMENT);
        updateTimerOnClick($("#increment-break"), $break, INCREMENT);

        updateTimerOnClick($("#increment-session"), $SESSION_TIMER, INCREMENT);
        updateTimerOnClick($("#decrement-session"), $SESSION_TIMER, DECREMENT);
    };
}
