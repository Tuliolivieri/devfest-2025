import express from 'express';
import Rescue from 'express-rescue';
import criarContaCorrenteController from './controllers/criar-conta-corrente.controller';
import saqueController from './controllers/saque.controller';
import depositoController from './controllers/deposito.controller';
import extratoController from './controllers/extrato.controller';


const router = express();

router.post('/conta-corrente', Rescue(criarContaCorrenteController.execute));

router.post('/saque', Rescue(saqueController.execute));

router.post('/deposito', Rescue(depositoController.execute));

router.get('/extrato/:contaCorrenteId', Rescue(extratoController.execute));


export default router;
