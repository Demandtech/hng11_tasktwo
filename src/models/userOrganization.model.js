function UserOrganizationsModel(sequelize, DataType) {
  const userOrganizations = sequelize.define(
    "UserOrganizations",
    {
      userId: {
        type: DataType.UUID,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'userId',
        },
      },
      orgId: {
        type: DataType.UUID,
        primaryKey: true,
        references: {
          model: 'organizations',
          key: 'orgId',
        },
      },
    },
    {
      tableName: "user_organizations",
    }
  );

  userOrganizations.associate = (models) => {
    userOrganizations.belongsTo(models.User, { foreignKey: "userId" });
    userOrganizations.belongsTo(models.Organization, { foreignKey: "orgId" });
  };

  return userOrganizations;
}

export default UserOrganizationsModel;


// function UserOrganizationsModel(sequelize, DataType) {
//     const userOrganizations = sequelize.define("UserOrganizations", {
//       userId: {
//         type: DataType.UUID,
//         primaryKey: true,
//         references: {
//           model: 'users',
//           key: 'userId',
//         },
//       },
//       orgId: {
//         type: DataType.UUID,
//         primaryKey: true,
//         references: {
//           model: 'organizations',
//           key: 'orgId',
//         },
//       },
//     }, {
//       tableName: "user_organizations",
//     });

//     userOrganizations.associate = (models) => {
//       userOrganizations.belongsTo(models.User, { foreignKey: "userId" });
//       userOrganizations.belongsTo(models.Organization, { foreignKey: "orgId" });
//     };
  
  
//     return userOrganizations;
//   }
  
//   export default UserOrganizationsModel;
  