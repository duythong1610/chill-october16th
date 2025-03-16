const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generalAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "59m" });
};

const generalRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "365d" });
};

const refreshTokenJwtService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      console.log({ token });
      jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) {
          console.log(err);
          resolve({
            status: "ERROR",
            message: "The authentication",
          });
        }

        const access_token = generalAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });

        resolve({
          status: "OK",
          message: "SUCCESS",
          access_token,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenJwtService,
};
