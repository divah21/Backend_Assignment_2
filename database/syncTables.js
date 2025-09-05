import db from '../models/index.js';

const syncTables = async () => {
  try {
    
    await db.sequelize.sync({ force: false, alter: true });

    if (process.env.NODE_ENV !== 'production') {
      await createSampleData();
    }

    process.exit(0);
  } catch (error) {
    console.error('Database synchronization failed:', error);
    process.exit(1);
  }
};


import { Router } from "express";

const syncTableRouter = Router()
syncTableRouter.get("/sync-tables", async (req, res) => {
  try {
    await db.sequelize.sync({ alter: true });
    return res.json({
      success: true,
      message: "Tables synced successfully"
    });
  } catch (err) {
    console.error('Sync error:', err);
    return res.status(500).json({
      success: false,
      message: "There was an error syncing the tables",
      error: err.message
    });
  }
});

export default syncTableRouter;

if (import.meta.url === `file://${process.argv[1]}`) {
  syncTables();
}