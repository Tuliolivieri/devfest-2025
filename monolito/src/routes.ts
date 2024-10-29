import express from 'express';
import Rescue from 'express-rescue';

import CadastrarCliente from './controllers/cadastrar-cliente.controller';
import SolicitarEmprestimo from './controllers/solicitar-emprestimo.controller';
import CriarContaCorrenteController from './controllers/criar-conta-corrente.controller';
import SaqueController from './controllers/saque.controller';
import DepositoController from './controllers/deposito.controller';
import ExtratoController from './controllers/extrato.controller';

const router = express();

router.post('/cliente', Rescue(CadastrarCliente.execute));

router.post('/emprestimo', Rescue(SolicitarEmprestimo.execute));

router.post('/conta-corrente', Rescue(CriarContaCorrenteController.execute));

router.post('/saque', Rescue(SaqueController.execute));

router.post('/deposito', Rescue(DepositoController.execute));

router.get('/extrato/:contaCorrenteId', Rescue(ExtratoController.execute));

export default router;
