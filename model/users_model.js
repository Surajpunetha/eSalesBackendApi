module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
        user_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        gender: {
          type: DataTypes.STRING,
        },
        birthDate: {
            type: DataTypes.STRING,
        },
        mobile: {
            type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        profilePicture: {
            type: DataTypes.STRING,
        },
      },
    );
    return users;
  };