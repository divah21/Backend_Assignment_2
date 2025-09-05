import { DataTypes } from "sequelize";
import sequelize from "../database/sequelizerConfig.js";

const Fixture = sequelize.define(
  "Fixture",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    code: DataTypes.INTEGER,
    event: DataTypes.INTEGER,
    finished: DataTypes.BOOLEAN,
    finished_provisional: DataTypes.BOOLEAN,
    kickoff_time: DataTypes.DATE,
    minutes: DataTypes.INTEGER,
    provisional_start_time: DataTypes.BOOLEAN,
    started: DataTypes.BOOLEAN,
    team_a: DataTypes.INTEGER,
    team_a_score: DataTypes.INTEGER,
    team_h: DataTypes.INTEGER,
    team_h_score: DataTypes.INTEGER,
    stats: DataTypes.JSONB,
  },
  {
    tableName: "fixtures",
    timestamps: true,
  }
);

export default Fixture;
