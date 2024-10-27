import clienteRepository from "../repositories/cliente.repository";
import emprestimoRepository from "../repositories/emprestimo.repository";
import analisarLimiteService from "./analisar-limite.service";

type Params = {
  cliente_id: number;
}

type Result = {
  status: 'aprovado' | 'reprovado'
  limite: number;
}

class SolicitarEmprestimoService {
  async execute(params :Params): Promise<Result> {
    const { cliente_id } = params;

    const cliente = await clienteRepository.findById({
      id: cliente_id
    });

    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const {
      limite,
    } = await analisarLimiteService.execute({
      email: cliente.email,
    });

    const status = limite > 20000 ? 'aprovado' : 'reprovado';

    await emprestimoRepository.save({
      limite,
      status,
      cliente_id,
    });

    if (status === 'aprovado') {
      // chamar repository
    }

    return {
      status,
      limite
    }
  }
}

export default new SolicitarEmprestimoService();
