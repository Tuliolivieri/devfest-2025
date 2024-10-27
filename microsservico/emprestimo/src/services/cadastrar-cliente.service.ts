import clienteRepository from "../repositories/cliente.repository";

type Params = {
  external_id: number;
  documento: string;
  email: string;
}

type Result = void;

class CadastrarClienteService {
  async execute(params: Params): Promise<Result> {
    const { documento, external_id, email } = params;
    await clienteRepository.save({
      documento,
      email,
      external_id,
    });
  }
}

export default new CadastrarClienteService();