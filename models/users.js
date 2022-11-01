
// table storing the data of user having column - user,password(hashed), userId and accessToken

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        accessToken: {
            type: DataTypes.STRING
        }
    },
        {
            timestamps: false
        });
    return Users;
};   