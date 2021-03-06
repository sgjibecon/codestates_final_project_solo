export default (Sequelize, DataTypes) => {
  return Sequelize.define('artwork', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING(100), // uint256은 1e70까지임(즉, 총 70자리 나올 수 있음)
      allowNull: false,
    },
    imgURI: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: '',
    },
    title: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: '',
    },
    desc: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: '',
    },
  })
}
