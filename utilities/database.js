import Sequelize from "sequelize";

const sequelize = new Sequelize("eCommerce","root", "root",{
  dialect:"mysql",
  host: "localhost",
});

export default  sequelize;
