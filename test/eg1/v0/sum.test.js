const statement = require('../../../src/eg1/v0/statement')
// var invoices_json = require('../../../resource/invoices.js');
// var plays_json = require('../../../resource/plays.js');


test("statement", () => {
    var invoices_json =
        {
            "customer": "BigCo",
            "performances": [
                {
                    "playID": "hamlet",
                    "audience": 55
                },
                {
                    "playID": "as-like",
                    "audience": 35
                },
                {
                    "playID": "othello",
                    "audience": 40
                }
            ]
        }
    var plays_json =
        {
            "hamlet": {"name": "Hamlet", "type": "tragedy"},
            "as-like": {"name": "As You Like It", "type": "comedy"},
            "othello": {"name": "Othello", "type": "tragedy"}
        }

    function sta() {
        let result = statement(invoices_json, plays_json);
        console.log(result);
        return result;
    }

    expect(sta()).not.toEqual("");
});
