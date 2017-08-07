'use strict';

describe("application", function () {
    var container, application;

    beforeEach(function () {
        container = fixture(
            '<div id="sample">sample html</div>'
        );
        document.body.appendChild(container);
        application = new Application(document);
    });

    afterEach(function () {
        document.body.removeChild(container);
    });


    it('it should display sample html', function () {
        expect(document.getElementById('sample').textContent).toEqual('sample html');
    });

});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}
