const { Users } = require("../model/index");
const bcrypt = require("bcrypt");
const base64 = require("base-64");

const basicAuth = async (req, res, next) => {
  const encodedHeaders = req.headers.authorization.split(" ")[1]; // "Basic dGFtaW06cGl6emE="
  const [username, password] = base64.decode(encodedHeaders).split(":");
  // let basicHeaderParts = req.headers.authorization.split(" "); // ['Basic', 'sdkjdsljd=']
  // let encodedString = basicHeaderParts.pop(); // sdkjdsljd=
  // let decodedString = base64.decode(encodedString); // "username:password"
  // let [username, password] = decodedString.split(":"); // username, password
  try {
    const user = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
      next();
    } else {
      next("Invalid User");
    }
  } catch (error) {
    res.status(403).send("Invalid Login");
  }
};
module.exports = {
  basicAuth,
};
