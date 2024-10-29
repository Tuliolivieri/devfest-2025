import clienteCadastradoWorker from "./cliente-cadastrado.worker";

[clienteCadastradoWorker].forEach(worker => {
  worker.execute();
})
