/**
 * 第一步改造
 * “看到这样长长的函数，我便下意识地想从整个函数中分离出不同的关注点”
 *
 *  查看代码时,发现这部分可能是用作计算一场演出的费用
 */
function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format;
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];

        let thisAmount = amountFor(perf, play)

        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

        // print line for this order
        result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}

/**
 * 1.将计算amount的部分抽离出来
 * 2.提升表达能力,给变量改名,使他们更简洁
 *  thisAmount -> result
 * 3.动态类型语言,参数名默认带类型
 * @param perf
 * @param play
 */
function amountFor(perf, play) {
    let result = 0;
    switch (play.type) {
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

module.exports = statement;
