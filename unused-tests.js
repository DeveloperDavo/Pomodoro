    it('should start countdown at 25:00 when clicking start', function () {
        application.init();

        document.getElementById('start-button').click();

        expect(document.getElementById('clock-time').children[0].innerHTML).toEqual("25:00");
    });

    it('should start countdown at 26:00 when clicking the clock after incrementing the session length', function () {
        application.init();
        document.getElementById('increment-session').click();

        document.getElementById('start-button').click();

        expect(document.getElementById('clock-time').children[0].innerHTML).toEqual("26:00");
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

    it('should not update session length when incrementing after the countdown has started', function () {
        application.init();
        document.getElementById('start-button').click();

        document.getElementById('increment-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('25');
    });

    it('should not update session length when decrementing after the countdown has started', function () {
        application.init();
        document.getElementById('start-button').click();

        document.getElementById('decrement-session').click();

        expect(document.getElementById('session-length').innerHTML).toEqual('25');
    });

    it('should start countdown at 5:00 when session is over', function () {
        application.init();

        document.getElementById('session-length').innerHTML = "1";
        document.getElementById('decrement-session').click();

        document.getElementById('start-button').click();

        expect(document.getElementById('clock-time').children[0].innerHTML).toEqual("05:00");
    });

    it('should display break mode when session is over', function () {
        application.init();

        document.getElementById('session-length').innerHTML = "1";
        document.getElementById('decrement-session').click();

        document.getElementById('start-button').click();

        expect(document.getElementById('clock-mode').innerHTML).toEqual("Break");
    });

    it('should not update break length when incrementing after the countdown has started', function () {
        application.init();
        document.getElementById('start-button').click();

        document.getElementById('increment-break').click();

        expect(document.getElementById('break-length').innerHTML).toEqual('5');
    });

    it('should not update break length when decrementing after the countdown has started', function () {
        application.init();
        document.getElementById('start-button').click();

        document.getElementById('decrement-break').click();

        expect(document.getElementById('break-length').innerHTML).toEqual('5');
    });

    it('should not update clock time when break length is incremented', function () {
        application.init();

        document.getElementById('clock-time').innerHTML = "25";

        document.getElementById('break-length').innerHTML = "5";
        document.getElementById('increment-break').click();

        expect(document.getElementById('clock-time').innerHTML).toEqual('25');
    });



