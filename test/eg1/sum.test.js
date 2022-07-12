const statement = require('../../src/eg1/statement')

test("statement", () => {
    var invoices =
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
        let result = statement(invoices, plays_json);
        console.log(result);
        return result;
    }

    expect(sta()).not.toEqual("");
});
