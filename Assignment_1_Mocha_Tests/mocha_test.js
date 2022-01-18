describe("Power", function() {

    describe("Test for x > 0 and n > 0", function() {

        function generateTests(x) {
            let expected = x * x * x;
            it (`${x} raised to power 3 is ${expected}`, function () {
                assert.equal(pow(x, 3), expected);
            });
        }

        for(let i = 1; i <= 5; i++) {
            generateTests(i);
        }

    });

    describe("Test for fractional value of n", function () {

        it("4 raised to 1.5", function () {
            assert.equal(pow(4, 1.5), "Only Integer power allowed.");
        });

    });

    describe("Test for negative value of n", function () {

        it("4 raised to -1", function () {
            assert.equal(pow(4, -1), "Only positive powers allowed.");
        });

    });

    describe("Test for wrong input type", function () {

        it("String raised to another string", function () {
            assert.equal(pow("abc", "xyz"), "Operation Not Permitted !");
        });

    });

    describe("Test for 0 raised to 0", function () {

        it("0 raised to 0 is an indeterminate expression.", function () {
            assert.equal(pow(0, 0), "Indeterminate Expression.");
        });

    });

    describe("Test for x < 0 and n > 0", function () {

        it("-2 raised to 2", function () {
            assert.equal(pow(-2, 2), 4);
        });

    });
  
  });