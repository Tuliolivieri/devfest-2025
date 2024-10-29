import { Job, Queue } from 'bullmq';
import errToJSON from 'error-to-json';

export type BullMessageOptions = {
    jobId?: string;
    removeOnComplete?: {
      age?: number;
      count?: number;
    } | boolean | number;
    attempts?: number;
    removeOnFail?: boolean;
    delay?: number;
    backoff?: {
      type: 'fixed' | 'exponential';
      delay: number;
    };
};

export class BullQueueAdapter {
  private queue: Queue;
  private connection: any;

  constructor(queueName: string, redisHost?: string, redisPort?: string, redisPassword?: string) {
    this.connection = {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    };

    this.queue = new Queue(queueName, {
      connection: this.connection,
    });
  }

  async addToQueue<T = any>(jobName: string, data: T, options?: BullMessageOptions): Promise<void> {
    try {
      await this.queue.add(jobName, JSON.stringify(data), {
        jobId: options?.jobId,
        removeOnComplete: options?.removeOnComplete ?? true,
        attempts: options?.attempts ?? 3,
        removeOnFail: options?.removeOnFail ?? false,
        delay: options?.delay ?? 0,
        backoff: options?.backoff ?? {
          type: 'exponential',
          delay: 30000
        },
      });
    } catch (error) {
    console.error('[bull] Erro ao adicionar job na fila', {
        jobName,
        data: JSON.stringify(data),
        options,
        error: errToJSON(error as Error),
      });
    }
  }

  async getFailed(): Promise<Job<any, any, string>[]> {
    return this.queue.getFailed();
  }
}