import { BullQueueAdapter } from "../adapters/bull-queue.adapter";
import { BullmqQueuesEnum } from "../enums/bullmq-queues.enum";
import clienteRepository from "../repositories/cliente.repository";

type Params = {
  documento: string;
}

type Result = void;

class SolicitarEmprestimoService {
  async execute(params :Params): Promise<Result> {
    const { documento } = params;

    const cliente = await clienteRepository.findByDocument({
      documento,
    });

    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    new BullQueueAdapter(BullmqQueuesEnum.ANALISAR_LIMITE).addToQueue('', {
      documento,
      email: cliente.email,
    });
  }
}

export default new SolicitarEmprestimoService();
