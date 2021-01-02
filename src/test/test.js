let fake = 10

function init(val) {
  fake = val
}
function getVal() {
  console.log(fake)
}

export default { init, getVal }
