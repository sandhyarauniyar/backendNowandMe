
// table storing the data of thoghts having column - thought,isAnonymous, thoughtId and userId

module.exports = (sequelize, DataTypes) => {
    const Thoughts = sequelize.define("thoughts", {
        thought: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAnonymous: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        thoughtId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            timestamps: false
        });
    return Thoughts;
};   