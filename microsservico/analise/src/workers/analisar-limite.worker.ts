import { BullmqQueuesEnum } from "../enums/bullmq-queues.enum";
import analisarLimiteService from "../services/analisar-limite.service";
import { AbstractWorker } from "./abstract-worker";

type AnalisarLimiteWorkerParams = {
  email: string;
}

class AnalisarLimiteWorker extends AbstractWorker {
  async process(job: { data: AnalisarLimiteWorkerParams; }): Promise<void> {

    const { email } = job.data;

    const result = await analisarLimiteService.execute({
      email,
    });
  }
}

export default new AnalisarLimiteWorker(BullmqQueuesEnum.ANALISAR_LIMITE);