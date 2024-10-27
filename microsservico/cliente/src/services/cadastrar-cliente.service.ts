import { BullQueueAdapter } from "../adapters/bull-queue.adapter";
import { BullmqQueuesEnum } from "../enums/bullmq-queues.enum";
import clienteRepository from "../repositories/cliente.repository";

type Params = {
  nome: string;
  email: string;
  documento: string;
}

type Result = {
  id: number;
}

class CadastrarClienteService {
  async execute(params :Params): Promise<Result> {
    const { documento, nome, email } = params;

    const result = await clienteRepository.save({
      documento,
      nome,
      email,
    });

    new BullQueueAdapter(BullmqQueuesEnum.CLIENTE_CADASTRADO_EMPRESTIMO).addToQueue('', {
      id: result.id,
      documento,
      nome,
      email,
    });

    return {
      id: result.id,
    };
  }
}

export default new CadastrarClienteService();
