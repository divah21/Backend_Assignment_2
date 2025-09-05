
import express from 'express';

const fixtureRouter = express.Router();

import { getFixtures, dumpFixtures } from '../controllers/fixtures.js';

fixtureRouter.get('/', getFixtures);
fixtureRouter.post('/dump', dumpFixtures);


export default fixtureRouter;
