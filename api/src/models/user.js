const { Model, UUIDV4 } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static associate(models) {
    User.hasMany(models.UserCards);
    User.belongsTo(models.Rol);
    User.belongsTo(models.Status);
    User.hasMany(models.Deck);
    User.hasMany(models.Opinion);
    User.hasMany(models.ShopCart);
    User.hasMany(models.Transaction);
    User.belongsToMany(models.CardPacks, { through: "FavPacks" });
    User.belongsToMany(models.PrivateChat, { through: "User-PrivChat" });
    User.belongsToMany(models.Game, { through: "PlayedGame" });
    User.belongsToMany(User, { as: 'friends', through: 'Friends' });
  }
}

User.prototype.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(11);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

User.prototype.comparePassword = async (inputPassword, password) => {
  return await bcrypt.compare(inputPassword, password);
};

module.exports = (sequelize, DataTypes) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stars: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
      },
      profileImg: {
        type: DataTypes.STRING,
        defaultValue:
          "https://static-cdn.jtvnw.net/jtv_user_pictures/jfv888-profile_image-ad6b23cd6b99e422-150x150.jpeg",
      },
      coverImg: {
        type: DataTypes.STRING,
        defaultValue:
          "https://bnetcmsus-a.akamaihd.net/cms/blog_header/2g/2G4VZH5TIWJF1602720144046.jpg",
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      notifications: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      onGame: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      defaultDeck: {
        type: DataTypes.INTEGER,
      },
      // roles: {
      //   type: DataTypes.ARRAY(DataTypes.STRING),
      //   defaultValue: ["user"],
      // },
      loginGoogle:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {
      timestamps: false,
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
