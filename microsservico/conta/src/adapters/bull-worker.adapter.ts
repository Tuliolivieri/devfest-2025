import { Worker } from 'bullmq';

export class BullWorkerAdapter {
  private worker: Worker | null = null;
  private connection: any;

  constructor(redisHost?: string, redisPort?: string, redisPassword?: string) {
    this.connection = {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    };
  }

  async start(queueName: string, callback: any): Promise<void> {
    this.worker = new Worker(queueName, callback, {
      connection: this.connection,
    });
  }

  async stop(): Promise<void> {
    await this.worker?.close();
  }
}