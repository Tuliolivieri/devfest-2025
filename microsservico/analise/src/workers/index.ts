import analisarLimiteWorker from "./analisar-limite.worker";

[analisarLimiteWorker].forEach(worker => {
  worker.execute();
})