import analisarLimiteWorker from "./analise-limite-concluida.worker";
import clienteCadastradoWorker from "./cliente-cadastrado.worker";

[analisarLimiteWorker, clienteCadastradoWorker].forEach(worker => {
  worker.execute();
})
