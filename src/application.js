'use strict';

function Application() {
    function incrementBreakTimerOnClick() {
        $("#increment-break").click(function () {
            $("#break-timer").text("6");
        })
    }

    this.init = function () {
        incrementBreakTimerOnClick();
    };
}
