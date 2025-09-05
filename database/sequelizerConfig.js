import { Sequelize } from 'sequelize';
import dbConfig from './db.js';

const sequelize = new Sequelize(dbConfig.development);

export default sequelize;