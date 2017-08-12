'use strict';

describe("application", function () {

    var container, application;

    beforeEach(function () {
        container = fixture(
            '<div class="container">' +
            '<div class="length-setter" id="break-length-setter"> ' +
            '<h5>BREAK LENGTH</h5>' +
            '<button id="decrement-break" value="decrement" class="crement-button">&minus;</button>' +
            '<span id="break-length"></span>' +
            '<button id="increment-break" value="increment" class="crement-button">+</button>' +
            '</div>' +
            '<div class="length-setter" id="session-length-setter">' +
            '<h5>SESSION LENGTH</h5>' +
            '<button id="decrement-session" value="decrement" class="crement-button">&minus;</button>' +
            '<span id="session-length"></span>' +
            '<button id="increment-session" value="increment" class="crement-button">+</button>' +
            '</div>' +
            '<div id="clock">' +
            '<h3 id="clock-mode" class="clock-text"></h3>' +
            '<h3 id="clock-time" class="clock-text"></h3>' +
            '</div>' +
            '<div id="clock-buttons">' +
            '<button id="start-pause-button" class="btn clock-button"></button>' +
            '<button id="reset-button" class="btn clock-button">RESET</button>' +
            '</div>' +
            '' +
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

    it('should display session mode upon initialisation', function () {
        application.init();

        expect(document.getElementById('clock-mode').innerHTML).toEqual("Session");
    });

    it('should display a clock time of 25:00 upon initialisation', function () {
        application.init();

        expect(document.getElementById('clock-time').innerHTML).toEqual('25:00');
    });

    it('should update clock time when session length is incremented by 1', function () {
        application.init();

        document.getElementById('session-length').innerHTML = "25";
        document.getElementById('increment-session').click();

        expect(document.getElementById('clock-time').innerHTML).toEqual('26:00');
    });

    it('should update clock time when session length is incremented by 2', function () {
        application.init();

        document.getElementById('session-length').innerHTML = "25";
        document.getElementById('increment-session').click();
        document.getElementById('increment-session').click();

        expect(document.getElementById('clock-time').innerHTML).toEqual('27:00');
    });

    it('should not update session length when incrementing after the countdown has started', function () {
        application.init();
        document.getElementById('start-pause-button').click();

        document.getElementById('increment-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('25');
    });

    it('should not update session length when decrementing after the countdown has started', function () {
        application.init();
        document.getElementById('start-pause-button').click();

        document.getElementById('decrement-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('25');
    });

    it('should not update break length when incrementing after the countdown has started', function () {
        application.init();
        document.getElementById('start-pause-button').click();

        document.getElementById('increment-break').click();

        expect(document.getElementById('break-length').innerHTML).toEqual('5');
    });

    it('should not update break length when decrementing after the countdown has started', function () {
        application.init();
        document.getElementById('start-pause-button').click();

        document.getElementById('decrement-break').click();

        expect(document.getElementById('break-length').innerHTML).toEqual('5');
    });

    it('should display start button upon initialisation', function () {
        application.init();

        expect(document.getElementById('start-pause-button').innerHTML).toEqual('START');
    });

    it('should display pause button when countdown starts', function () {
        application.init();

        document.getElementById('start-pause-button').click();

        expect(document.getElementById('start-pause-button').innerHTML).toEqual('PAUSE');
    });

    it('should display start button when paused', function () {
        application.init();

        document.getElementById('start-pause-button').click();
        document.getElementById('start-pause-button').click();

        expect(document.getElementById('start-pause-button').innerHTML).toEqual('START');
    });

    it('should reset countdown', function () {
        application.init();
        document.getElementById('session-length').innerHTML = "21";
        document.getElementById('decrement-session').click();

        document.getElementById('start-pause-button').click();
        document.getElementById('clock-time').innerHTML = "19:36";
        document.getElementById('reset-button').click();

        expect(document.getElementById('clock-time').innerHTML).toEqual('20:00');
    });

    it('should show start button after resetting', function () {
        application.init();

        document.getElementById('start-pause-button').click();
        document.getElementById('reset-button').click();

        document.getElementById('increment-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('26');

    });

    it('should enable crement buttons after resetting', function () {
        application.init();

        document.getElementById('start-pause-button').click();
        document.getElementById('reset-button').click();

        expect(document.getElementById('start-pause-button').innerHTML).toEqual('START');
    });

    it('should countdown upon clicking start', function (done) {
        application.init();
        document.getElementById('session-length').innerHTML = "21";
        document.getElementById('decrement-session').click();

        document.getElementById('start-pause-button').click();

        setTimeout(function() {
            expect(document.getElementById('clock-time').innerHTML).toEqual('19:59');
            done();
        }, 1000);
    });

});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}
