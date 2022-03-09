const less = require('./packages/less');

less.parse(`.test {
  --height: #111
}`, {}, function (err, root, imports, options) {
  console.log(err, root, imports, options)
})