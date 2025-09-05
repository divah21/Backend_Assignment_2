
import express from 'express';

const fixtureRouter = express.Router();

import { getFixtures } from '../controllers/fixtures.js';

fixtureRouter.get('/', getFixtures);


export default fixtureRouter;
