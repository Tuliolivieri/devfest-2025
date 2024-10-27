
import { BullmqQueuesEnum } from "../enums/bullmq-queues.enum";
import procesarEmrprestimoService from "../services/procesar-emrprestimo.service";
import { AbstractWorker } from "./abstract-worker";

type AnalisarLimiteWorkerParams = {
  documento: string;
  limite: number;
  probabilidade: number;
}

class AnalisarLimiteWorker extends AbstractWorker {
  async process(job: { data: AnalisarLimiteWorkerParams; }): Promise<void> {
    const { documento, limite, probabilidade, } = job.data;

    const result = await procesarEmrprestimoService.execute({
      documento,
      limite,
      probabilidade,
    });
  }
}

export default new AnalisarLimiteWorker(BullmqQueuesEnum.ANALISE_LIMITE_CONCLUIDA);