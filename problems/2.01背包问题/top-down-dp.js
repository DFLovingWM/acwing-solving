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
 * 01背包问题：Top-down DP
 * 
 * 时间：4547ms
 */
function knapsack01 (costs, values, sumCost) {
  const N = costs.length
  const cache = new Map()

  function getKey (i, currCost) {
    return `${i}, ${currCost}`
  }

  function helper (i, currCost) {
    if (i === N) return 0
    
    const key = getKey(i, currCost)
    if (cache.has(key)) return cache.get(key)

    let res = helper(i + 1, currCost) // 不选
    if (currCost + costs[i] <= sumCost) { // （如果能选的话）选
      res = Math.max(res, helper(i + 1, currCost + costs[i]) + values[i])
    }
    cache.set(key, res)
    return res
  }

  return helper(0, 0)
}