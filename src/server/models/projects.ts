'use strict';
import { Model } from 'sequelize';
interface ProjectAttributes {
  id: number;
  title: string;
  status: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Projects extends Model<ProjectAttributes> implements ProjectAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    title!: string;
    status!: string;
    static associate(models: any) {
      Projects.belongsToMany(models.User, {
        through: 'ProjectAssignments',
      });
      // define association here
    }
  }
  Projects.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Projects',
    }
  );
  return Projects;
};
