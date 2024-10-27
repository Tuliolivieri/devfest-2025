import express from 'express';
import Rescue from 'express-rescue';
import SolicitarEmprestimoController from './controllers/solicitar-emprestimo.controller';

const router = express();

router.post('/emprestimo', Rescue(SolicitarEmprestimoController.execute));

export default router;
