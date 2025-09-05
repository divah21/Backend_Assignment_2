import axios from 'axios';
import { API_SERVICE } from '../config/env.js';
// const errorLogger = require('../../../helpers/error_logger');



export const getFixtures = async (req, res) => {
  try {
     const response = await axios.get(`${API_SERVICE}` );

    res.status(200).json(response.data);
  } catch (error) {
    // errorLogger.error(`get fixtures error: ${error}`);

    const status = error.response?.status || 500;
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      'Internal server error';

    return res.status(status).json({
      success: false,
      message
    });
  }
};

