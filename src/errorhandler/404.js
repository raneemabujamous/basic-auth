function handle404Eror(req, res, next) {
  const error404 = {
    stuts: 404,
    massage: "404 error found",
  };
  res.status(404).json(error404);
}
module.exports = handle404Eror;
