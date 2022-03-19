require("dotenv").config()

const config = {
    port:process.env.PORT,
    env:process.env.NODE_ENV,
    jwt_secret:process.env.JWT_SECRET,
    db_pass: process.env.DB_PASS,
    db_user: process.env.DB_USER,
    db_host:process.env.DB_HOST,
    db_name:process.env.DB_NAME,
}

module.exports = config