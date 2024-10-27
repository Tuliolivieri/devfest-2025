import clienteRepository from "../repositories/cliente.repository";
import emprestimoRepository from "../repositories/emprestimo.repository";

type Params = {
  documento: string;
  limite: number;
  probabilidade: number;
}

type Result = void;

class ProcessarEmprestimoService {
  async execute(params: Params): Promise<Result> {
    const { documento, limite, probabilidade } = params;

    const cliente = await clienteRepository.findByDocument({
      documento,
    });

    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    const status = limite < 10000 ? 'Reprovado' : 'Aprovado';

    await emprestimoRepository.save({
      limite,
      status,
      cliente_id: cliente.id
    });

    console.log('Aqui eu enviaria o email para o cliente', { email: cliente.email, status, limite });
  }
}

export default new ProcessarEmprestimoService();