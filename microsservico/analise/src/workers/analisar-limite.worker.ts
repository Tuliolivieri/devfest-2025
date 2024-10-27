import { BullmqQueuesEnum } from "../enums/bullmq-queues.enum";
import analisarLimiteService from "../services/analisar-limite.service";
import { AbstractWorker } from "./abstract-worker";

type AnalisarLimiteWorkerParams = {
  email: string;
  documento: string;
}

class AnalisarLimiteWorker extends AbstractWorker {
  async process(job: { data: AnalisarLimiteWorkerParams; }): Promise<void> {
    const { email, documento } = job.data;

    await analisarLimiteService.execute({
      email,
      documento
    });
  }
}

export default new AnalisarLimiteWorker(BullmqQueuesEnum.ANALISAR_LIMITE);