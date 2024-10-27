import express from 'express';
import Rescue from 'express-rescue';

import CadastrarCliente from './controllers/cadastrar-cliente.controller';
import SolicitarEmprestimo from './controllers/solicitar-emprestimo.controller';

const router = express();

router.post('/cliente', Rescue(CadastrarCliente.execute));

router.post('/emprestimo', Rescue(SolicitarEmprestimo.execute));

router.post('/saque');

router.post('/deposito')

router.get('/extrato');

export default router;
