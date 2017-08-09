'use strict';

describe("application", function () {

    var container, application;

    beforeEach(function () {
        container = fixture(
            '<button id="decrement-break" value="decrement">&minus;</button>' +
            '<span id="break-length"></span>' +
            '<button id="increment-break" value="increment">+</button>' +
            '<button id="decrement-session" value="decrement">&minus;</button>' +
            '<span id="session-length"></span>' +
            '<button id="increment-session" value="increment">+</button>' +
            '<div id="clock">' +
            '<h3 id="clock-mode"></h3>' +
            '<h3 id="clock-time"></h3>' +
            '</div>'
        );
        document.body.appendChild(container);
        application = new Application(document);
    });

    afterEach(function () {
        document.body.removeChild(container);
    });

    it('should display an initial session length of 25', function () {
        application.init();

        expect(document.getElementById('session-length').innerHTML).toEqual('25');
    });

    it('should increment session length by 1', function () {
        application.init();

        document.getElementById('session-length').innerHTML = "25";

        document.getElementById('increment-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('26');
    });

    it('should increment session length by 2', function () {
        application.init();

        document.getElementById('increment-session').click();
        document.getElementById('increment-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('27');
    });

    it('should decrement session length', function () {
        application.init();
        document.getElementById('session-length').innerHTML = "25";

        document.getElementById('decrement-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('24');

        document.getElementById('decrement-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('23');
    });

    it('should update clock time when session length is incremented by 1', function () {
        application.init();

        document.getElementById('session-length').innerHTML = "25";
        document.getElementById('increment-session').click();

        expect(document.getElementById('clock-time').innerHTML).toEqual('26');
    });

    it('should update clock time when session length is incremented by 2', function () {
        application.init();

        document.getElementById('session-length').innerHTML = "25";
        document.getElementById('increment-session').click();
        document.getElementById('increment-session').click();

        expect(document.getElementById('clock-time').innerHTML).toEqual('27');
    });

    it('should display a clock time of 25 upon initialisation', function () {
        application.init();

        expect(document.getElementById('clock-time').innerHTML).toEqual('25');
    });

    it('should start countdown at 25:00 when clicking the clock', function () {
        application.init();

        document.getElementById('clock').click();

        expect(document.getElementById('clock-time').children[0].innerHTML).toEqual("25:00");
    });

    it('should start countdown at 26:00 when clicking the clock after incrementing the session length', function () {
        application.init();
        document.getElementById('increment-session').click();

        document.getElementById('clock').click();

        expect(document.getElementById('clock-time').children[0].innerHTML).toEqual("26:00");
    });

    it('should not update session length when incrementing after the countdown has started', function () {
        application.init();
        document.getElementById('clock').click();

        document.getElementById('increment-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('25');
    });

    it('should not update session length when decrementing after the countdown has started', function () {
        application.init();
        document.getElementById('clock').click();

        document.getElementById('decrement-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('25');
    });

    it('should increment break length by 1', function () {
        application.init();
        document.getElementById('break-length').innerHTML = "5";

        document.getElementById('increment-break').click();

        expect(document.getElementById('break-length').innerHTML).toEqual('6');
    });

    it('should increment break length by 2', function () {
        application.init();
        document.getElementById('break-length').innerHTML = "5";

        document.getElementById('increment-break').click();
        document.getElementById('increment-break').click();

        expect(document.getElementById('break-length').innerHTML).toEqual('7');
    });

    it('should decrement break length', function () {
        application.init();
        document.getElementById('break-length').innerHTML = "5";

        document.getElementById('decrement-break').click();

        expect(document.getElementById('break-length').innerHTML).toEqual('4');

        document.getElementById('decrement-break').click();

        expect(document.getElementById('break-length').innerHTML).toEqual('3');
    });

    it('should start countdown at 5:00 when session is over', function () {
        application.init();

        document.getElementById('session-length').innerHTML = "1";
        document.getElementById('decrement-session').click();

        document.getElementById('clock').click();

        expect(document.getElementById('clock-time').children[0].innerHTML).toEqual("05:00");
    });

    it('should display session mode upon initialisation', function () {
        application.init();

        expect(document.getElementById('clock-mode').innerHTML).toEqual("SESSION");
    });

    it('should display break mode when session is over', function () {
        application.init();

        document.getElementById('session-length').innerHTML = "1";
        document.getElementById('decrement-session').click();

        document.getElementById('clock').click();

        expect(document.getElementById('clock-mode').innerHTML).toEqual("BREAK");
    });

});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}
