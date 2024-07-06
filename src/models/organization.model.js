function OrgModel(sequelize, DataType) {
	const organization = sequelize.define(
		"Organization",
		{
			orgId: {
				type: DataType.UUID,
				defaultValue: DataType.UUIDV4,
				primaryKey: true,
				allowNull: false,
				unique: true,
			},
			name: {
				allowNull: false,
				type: DataType.STRING,
			},
			description: {
				type: DataType.STRING,
			},
			ownerId: {
				type: DataType.UUID,
				allowNull: false,
			},
		},
		{
			tableName: "organizations",
		}
	);

	organization.associate = (models) => {
		organization.belongsTo(models.User, {
			foreignKey: "ownerId",
			as: "creator",
		});
		organization.belongsToMany(models.User, {
			through: models.UserOrganizations,
			as: "members",
			foreignKey: "orgId",
			otherKey: "userId",
		});
	};

	return organization;
}

export default OrgModel;

// function OrgModel(sequelize, DataType) {
// 	const organization = sequelize.define(
// 		"Organization",
// 		{
// 			orgId: {
// 				type: DataType.UUID,
// 				defaultValue: DataType.UUIDV4,
// 				primaryKey: true,
// 				allowNull: false,
// 				unique: true,
// 			},
// 			name: {
// 				allowNull: false,
// 				type: DataType.STRING,
// 				unique: true,
// 			},
// 			description: {
// 				type: DataType.STRING,
// 			},

// 			ownerId: {
// 				type: DataType.UUID,
// 				allowNull: false,
// 			},
// 		},
// 		{
// 			tableName: "organizations",
// 		}
// 	);

// 	organization.associate = (models) => {
// 		organization.belongsTo(models.User, {
// 			foreignKey: "ownerId",
// 			as: "creator",
// 		});
// 		organization.belongsToMany(models.User, {
// 			through: models.UserOrganizations,
// 			as: "members",
// 			foreignKey: "orgId",
// 			otherKey: "userId",
// 		});
// 	};

// 	return organization;
// }

// export default OrgModel;
