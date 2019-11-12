const readline = require('readline');
const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

r.on('line', line => {
  const [a, b] = line.split(' ').map(Number)
  console.log(a + b)
})
