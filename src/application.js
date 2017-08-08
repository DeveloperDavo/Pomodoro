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

    this.init = function () {
        
        var $break = $("#break-timer");
        updateTimerOnClick($("#decrement-break"), $break, DECREMENT);
        updateTimerOnClick($("#increment-break"), $break, INCREMENT);

        var $session = $("#session-timer");
        updateTimerOnClick($("#increment-session"), $session, INCREMENT);
        updateTimerOnClick($("#decrement-session"), $session, DECREMENT);
    };
}
