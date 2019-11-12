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
 * 时间：9573ms
 */
function knapsackComplete (costs, values, sumCost) {
  const N = costs.length
  const cache = new Map()

  function getKey (i, currCost) {
    return `${i}, ${currCost}`
  }

  function helper (i, currCost) {
    if (i === N) return 0
    
    const key = getKey(i, currCost)
    if (cache.has(key)) return cache.get(key)

    let res = 0
    let maxK = Math.floor((sumCost - currCost) / costs[i]) // 最多选maxK件
    for (let k = 0; k <= maxK; ++k) {
      res = Math.max(res, k * values[i] + helper(i + 1, currCost + k * costs[i]))
    }
    cache.set(key, res)
    return res
  }

  return helper(0, 0)
}