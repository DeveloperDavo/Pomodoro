'use strict';

function Application() {
    function incrementBreakTimerOnClick() {
        $("#increment-break").click(function () {
            var breakTimerElement = $("#break-timer");
            var breakTimerText = Number(breakTimerElement.text());
            breakTimerElement.text(breakTimerText + 1);
        })

    }

    this.init = function () {
        incrementBreakTimerOnClick();
    };
}
