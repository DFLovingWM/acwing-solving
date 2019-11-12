const readline = require('readline');
const fs = require('fs');

const r = readline.createInterface({
  // input: process.stdin,
  input: fs.createReadStream('./in.txt'),
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
      console.log(knapsackComplete(costs, values, V))
    }
  }
  ++lineNum
})

/**
 * 完全背包问题
 * 
 * 时间：2453ms
 */
function knapsackComplete (costs, values, sumCost) {
  const N = costs.length
  // dp[i][cost]表示对于前i个物品、总代价为cost能获取的最大价值
  const dp = Array.from({ length: N + 1 }, () => Array.from({ length: sumCost + 1 }, () => 0))
  
  // 迭代
  for (let i = 1; i <= N; ++i) {
    for (let cost = 0; cost <= sumCost; ++cost) {
      const maxK = Math.floor(cost / costs[i - 1]) // 最多买maxK件
      for (let k = 0; k <= maxK; ++k) {
        dp[i][cost] = Math.max(
          dp[i][cost],
          dp[i - 1][cost - k * costs[i - 1]] + k * values[i - 1]
        )
      }
    }
  }

  return dp[N][sumCost]
}