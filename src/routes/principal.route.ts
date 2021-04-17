import {Router} from 'express';

const router:Router = Router();

import {controller} from '../controllers/principal.controller';

router.get('/',controller.helloWorld);

router.get('/interpretar',controller.interpretar);

export default router;
 