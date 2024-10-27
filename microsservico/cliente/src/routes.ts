import express from 'express';
import Rescue from 'express-rescue';

import CadastrarCliente from './controllers/cadastrar-cliente.controller';

const router = express();

router.post('/cliente', Rescue(CadastrarCliente.execute));

export default router;
