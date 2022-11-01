
//table storing the data of user having column - reply,isAnonymous, replyId and thoughtId

module.exports = (sequelize, DataTypes) => {
    const Reply = sequelize.define("replies", {
        reply: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAnonymous: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        replyId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        thoughtId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            timestamps: false
        });
    return Reply;
};   