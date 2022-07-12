/**
 * 第三步改造 重构volumeCredits
 *
 * 1.拆分循环
 * 2.移动语句,将变量声明挪动到紧邻循环的位置
 * 3.将变量的计算过程提炼成函数
 */
function statement(invoice, plays) {
    let totalAmount = 0;

    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        // print line for this order
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }
    let volumeCredits = totalVolumeCredits();

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

    function totalVolumeCredits() {
        let volumeCredits = 0;
        for (let perf of invoice.performances) {
            volumeCredits += volumeCreditsFor(perf);
        }
        return volumeCredits;
    }

}


module.exports = statement;
