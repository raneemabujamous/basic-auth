function handle500Eroro(req, res, next) {
  const error500obj = {
    status: 500,
    massage: "500 eroro ocures",
  };
  res.status(500).json(error500obj);
}
module.exports = handle500Eroro;
