const readline = require('readline');
const fs = require('fs');

const r = readline.createInterface({
  input: process.stdin,
  // input: fs.createReadStream('./in.txt'),
  output: process.stdout
})

let lineNum = 0
let N, V
let costs, values

r.on('line', line => {
  if (lineNum === 0) {
    [N, V] = line.split(' ').map(Number)
    costs = []
    values = []
  } else {
    const [cost, value] = line.split(' ').map(Number)
    costs.push(cost)
    values.push(value)
    
    if (lineNum === N) {
      console.log(knapsack01(costs, values, V))
    }
  }
  ++lineNum
})

/**
 * 01背包问题：Bottom-up DP
 * 
 * 时间：1997ms
 */
function knapsack01 (costs, values, sumCost) {
  const N = costs.length
  // dp[i][cost]表示对于第i个物品、总代价为cost能获取的最大价值
  const dp = Array.from({ length: N }, () => Array.from({ length: sumCost + 1 }, () => 0))

  // 初始状态
  for (let cost = 0; cost <= sumCost; ++cost) {
    if (cost >= costs[0]) {
      dp[0][cost] = values[0]
    }
  }
  
  // 迭代
  for (let i = 1; i < N; ++i) {
    for (let cost = 0; cost <= sumCost; ++cost) {
      if (cost < costs[i]) { // 钱不够，只能不选
        dp[i][cost] = dp[i - 1][cost]
      } else { // 钱够，可以选或者不选
        dp[i][cost] = Math.max(
          dp[i - 1][cost],
          dp[i - 1][cost - costs[i]] + values[i]
        )
      }
    }
  }

  return dp[N - 1][sumCost]
}