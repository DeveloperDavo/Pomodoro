    it('should increment break break length by 1', function () {
        application.init();
        var breakLengthElement = document.getElementById('break-length');
        breakLengthElement.innerHTML = "5";

        document.getElementById('increment-break').click();

        expect(breakLengthElement.innerHTML).toEqual('6');
    });

    it('should increment break length by 2', function () {
        application.init();
        var breakLengthElement = document.getElementById('break-length');
        breakLengthElement.innerHTML = "5";

        document.getElementById('increment-break').click();
        document.getElementById('increment-break').click();

        expect(breakLengthElement.innerHTML).toEqual('7');
    });

    it('should decrement break length', function () {
        application.init();
        var breakLengthElement = document.getElementById('break-length');
        breakLengthElement.innerHTML = "5";

        document.getElementById('decrement-break').click();

        expect(breakLengthElement.innerHTML).toEqual('4');

        document.getElementById('decrement-break').click();

        expect(breakLengthElement.innerHTML).toEqual('3');
    });

    it('should not update clock time when break length is incremented', function () {
        application.init();

        document.getElementById('clock-time').innerHTML = "25";

        document.getElementById('break-length').innerHTML = "5";
        document.getElementById('increment-break').click();

        expect(document.getElementById('clock-time').innerHTML).toEqual('25');
    });


