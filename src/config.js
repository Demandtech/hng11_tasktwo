const config = {
	db_name: process.env.DATABASE_NAME,
	db_host: process.env.DATABASE_HOST,
	db_password: process.env.DATABASE_PASSWORD,
	db_username: process.env.DATABASE_USERNAME,
    port:process.env.PORT,
	jwt_secret: process.env.JWT_SECRET,
	db_port: process.env.DATABASE_PORT
};

export default config;
