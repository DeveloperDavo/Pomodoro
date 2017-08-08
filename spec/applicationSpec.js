'use strict';

describe("application", function () {

    var container, application;

    beforeEach(function () {
        container = fixture(
            '<div id="sample">sample html</div>' +
            '<button id="increment-break">+</button>' +
            '<span id="break-timer">5</span>'
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


});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}
