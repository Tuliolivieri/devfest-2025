import clienteRepository from "../repositories/cliente.repository";

type Params = {
  external_id: number;
  documento: string;
  email: string;
  nome: string;
};

type Result = void;

class CadastrarClienteService {
  async execute(params: Params): Promise<Result> {
    const { documento, external_id, email, nome } = params;
    await clienteRepository.save({
      documento,
      email,
      external_id,
      nome,
    });
  }
}

export default new CadastrarClienteService();