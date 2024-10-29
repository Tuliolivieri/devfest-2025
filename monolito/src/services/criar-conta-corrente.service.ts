import contaCorrenteRepository from "../repositories/conta-corrente.repository";

export type CriarContaCorrenteDTO = {
  clienteId: number;
  numero: number;
  digito: number;
  agencia: number;
};

class CriarContaCorrenteService {
  async execute({ clienteId, numero, digito, agencia }: CriarContaCorrenteDTO) {
    const result = await contaCorrenteRepository.create({
      clienteId,
      numero,
      digito,
      agencia,
    });

    return result;
  }
}

export default new CriarContaCorrenteService();
