import Sequelize from "sequelize";

const sequelize = new Sequelize("eCommerce","root", "root",{
  dialect:"mysql",
  host: "localhost",
  logging: false
});

export default  sequelize;
