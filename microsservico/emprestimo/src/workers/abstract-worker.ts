import errToJSON from 'error-to-json';
import { BullWorkerAdapter } from '../adapters/bull-worker.adapter';
import { BullQueueAdapter } from '../adapters/bull-queue.adapter';

type JobOptions = {
  id: string,
  data: string, 
  opts:{
    attempts: number
  },
  attemptsStarted: number
}

export abstract class AbstractWorker {
  private queueName: string;
  private workers: BullWorkerAdapter[] = [];
  private maxWorkers: number;
  private connection: { host: string; port: string; password?: string }

  constructor(queueName: string, redisHost?: string, redisPort?: string, redisPassword?: string, maxWorkers: number = 1) {
    this.queueName = queueName;
    this.maxWorkers = maxWorkers;
    
    this.connection = {
      host: process.env.REDIS_HOST!,
      port: process.env.REDIS_PORT!,
    };

    this.processFailedJobs();
  }

  private async processFailedJobs(): Promise<void> {
    try {
      const queue = new BullQueueAdapter(this.queueName, this.connection.host, this.connection.port, this.connection.password);
      const failedJobs = await queue.getFailed();
      failedJobs.forEach((job) =>
        setTimeout(() => {
          if (job)
            job.retry().catch((err) => {
              console.error('[bull] erro ao reprocessar tarefas com falha', {
                jobData: job.data,
                job,
                error: errToJSON(err as Error),
              });
            });
        }, 1200),
      );
    } catch (err) {
      console.error('[bull] erro ao reprocessar tarefas com falha', {
        error: errToJSON(err as Error),
      });
    }
  }

  // TODO: criar algum método para deixar esse método final
  async execute(): Promise<void> {
    for (let i = 0; i < this.maxWorkers; i++) {
      const worker = new BullWorkerAdapter(this.connection.host, this.connection.port, this.connection.password);
      await worker.start(this.queueName, async (job: JobOptions) => {
        try {
          await this.process({
            ...job,
            data: JSON.parse(job.data, dateReviver),
          });
        } catch (err) {
          const attempts = job.opts.attempts;
          const attemptsStarted = job.attemptsStarted;
          const isLastAttemptOrReprocess = attemptsStarted >= attempts;

          console.error(`[bull] erro ao processar job - ${this.queueName}`, {
            queueName: this.queueName,
            messageId: job.id,
            error: errToJSON(err as Error),
          });

          throw err;
        }
        this.workers.push(worker);
      });
    }
  }

  abstract process(job: { data: any }): Promise<void>;

  public getWorkers(): BullWorkerAdapter[] {
    return this.workers;
  }
}

function dateReviver(_key: string, value: any): any {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.exec(value)) {
    return new Date(value);
  }
  if (typeof value === 'object') {
    for (const prop in value) {
      // eslint-disable-next-line no-prototype-builtins
      if (value.hasOwnProperty(prop)) {
        value[prop] = dateReviver(prop, value[prop]);
      }
    }
  }
  return value;
}