/**
 * 第二步改造  移除局部参数play,thisAmount,volumeCredits,usd
 *
 * 观察amountFor函数时，我会看看它的参数都从哪里来。
 * aPerformance是从循环变量中来，所以自然每次循环都会改变，
 * 但play变量是由performance变量计算得到的，
 * 因此根本没必要将它作为参数传入，我可以在amountFor函数中重新计算得到它。
 *
 *
 * 移除局部变量的好处就是做提炼时会简单得多,因为需要操心的局部作用域变少了
 */
function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {

        volumeCredits += volumeCreditsFor(perf);

        // print line for this order
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }
    result += `Amount owed is ${usd(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;


    /**
     * 1.将计算amount的部分抽离出来
     * 2.提升表达能力,给变量改名,使他们更简洁
     *  thisAmount -> result
     * 3.动态类型语言,参数名默认带类型
     * @param perf
     * @param play
     */
    function amountFor(perf) {
        let result = 0;
        switch (playFor(perf).type) {
            case "tragedy":
                result = 40000;
                if (perf.audience > 30) {
                    result += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (perf.audience > 20) {
                    result += 10000 + 500 * (perf.audience - 20);
                }
                result += 300 * perf.audience;
                break;
            default:
                throw new Error(`unknown type: ${play.type}`);
        }
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function volumeCreditsFor(perf) {
        let result = 0;
        // add volume credits
        result += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === playFor(perf).type) result += Math.floor(perf.audience / 5);

        return result;
    }

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US",
            {
                style: "currency", currency: "USD",
                minimumFractionDigits: 2
            }).format(aNumber);
    }
}


module.exports = statement;
