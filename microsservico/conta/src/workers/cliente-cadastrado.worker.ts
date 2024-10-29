
import { BullmqQueuesEnum } from "../enums/bullmq-queues.enum";
import cadastrarClienteService from "../services/cadastrar-cliente.service";
import { AbstractWorker } from "./abstract-worker";

type ClienteCadastradoWorkerParams = {
  id: number;
  documento: string;
  nome: string;
  email: string;
}

class ClienteCadastradoWorker extends AbstractWorker {
  async process(job: { data: ClienteCadastradoWorkerParams; }): Promise<void> {
    const { id, documento, nome, email } = job.data;

    await cadastrarClienteService.execute({
      email,
      documento,
      external_id: id,
      nome,
    });
  }
}

export default new ClienteCadastradoWorker(
  BullmqQueuesEnum.CLIENTE_CADASTRADO_CONTA
);