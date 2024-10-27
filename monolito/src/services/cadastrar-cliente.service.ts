import clienteRepository from "../repositories/cliente.repository";

type Params = {
  nome: string;
  email: string;
  documento: string;
}

type Result = {
  id: number;
}

class CadastrarClienteService {
  async execute(params :Params): Promise<Result> {
    const { documento, nome, email } = params;

    const result = await clienteRepository.save({
      documento,
      nome,
      email,
    });

    return {
      id: result.id,
    };
  }
}

export default new CadastrarClienteService();
