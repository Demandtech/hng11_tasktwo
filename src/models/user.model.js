function UserModel(sequelize, DataType) {
	const user = sequelize.define(
		"User",
		{
			userId: {
				type: DataType.UUID,
				defaultValue: DataType.UUIDV4,
				primaryKey: true,
				allowNull: false,
				unique: true,
			},
			email: {
				allowNull: false,
				type: DataType.STRING,
				unique: true,
			},
			firstName: {
				allowNull: false,
				type: DataType.STRING,
			},
			lastName: {
				allowNull: false,
				type: DataType.STRING,
			},
			password: {
				allowNull: false,
				type: DataType.STRING,
			},
			phone: {
				type: DataType.STRING,
			},
		},
		{
			tableName: "users",
		}
	);

	user.associate = (models) => {
		user.hasMany(models.Organization, {
			foreignKey: "ownerId",
			as: "createdOrganization",
		});

		user.belongsToMany(models.Organization, {
			through: models.UserOrganizations,
			as: "joinedOrganizations",
			foreignKey: "userId",
			otherKey: "orgId",
		});
	};

	return user;
}

export default UserModel;
