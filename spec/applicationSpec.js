'use strict';

describe("application", function () {

    var container, application;

    beforeEach(function () {
        container = fixture(
            '<button id="decrement-break">&minus;</button>' +
            '<span id="break-timer">5</span>' +
            '<button id="increment-break">+</button>' +
            '<button id="decrement-session">&minus;</button>' +
            '<span id="session-timer">25</span>' +
            '<button id="increment-session">+</button>' +
            '<h3 id="clock-time">24:59</h3>'
        );
        document.body.appendChild(container);
        application = new Application(document);
    });

    afterEach(function () {
        document.body.removeChild(container);
    });

    it('should increment break timer once', function () {
        application.init();
        var breakTimerElement = document.getElementById('break-timer');
        breakTimerElement.innerHTML = "5";

        document.getElementById('increment-break').click();

        expect(breakTimerElement.innerHTML).toEqual('6');
    });

    it('should increment break timer twice', function () {
        application.init();
        var breakTimerElement = document.getElementById('break-timer');
        breakTimerElement.innerHTML = "5";

        document.getElementById('increment-break').click();
        document.getElementById('increment-break').click();

        expect(breakTimerElement.innerHTML).toEqual('7');
    });

    it('should decrement break timer', function () {
        application.init();
        var breakTimerElement = document.getElementById('break-timer');
        breakTimerElement.innerHTML = "5";

        document.getElementById('decrement-break').click();

        expect(breakTimerElement.innerHTML).toEqual('4');

        document.getElementById('decrement-break').click();

        expect(breakTimerElement.innerHTML).toEqual('3');
    });

    it('should increment session timer once', function () {
        application.init();

        var sessionTimerElement = document.getElementById('session-timer');
        sessionTimerElement.innerHTML = "25";

        document.getElementById('increment-session').click();

        expect(sessionTimerElement.innerHTML).toEqual('26');
    });

    it('should increment session timer twice', function () {
        application.init();

        var sessionTimerElement = document.getElementById('session-timer');
        sessionTimerElement.innerHTML = "25";

        document.getElementById('increment-session').click();
        document.getElementById('increment-session').click();

        expect(sessionTimerElement.innerHTML).toEqual('27');
    });

    it('should decrement session timer', function () {
        application.init();
        var sessionTimerElement = document.getElementById('session-timer');
        sessionTimerElement.innerHTML = "25";

        document.getElementById('decrement-session').click();

        expect(sessionTimerElement.innerHTML).toEqual('24');

        document.getElementById('decrement-session').click();

        expect(sessionTimerElement.innerHTML).toEqual('23');
    });

    it('should update clock time to show session timer', function () {
        application.init();

        document.getElementById('session-timer').innerHTML = "25";
        document.getElementById('increment-session').click();

        expect(document.getElementById('clock-time').innerHTML).toEqual('26');
    });

});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}
