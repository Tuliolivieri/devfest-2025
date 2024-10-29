import contaCorrenteRepository from "../repositories/conta-corrente.repository";

class ExtratoService {
  async execute(contaCorrenteId: number) {
    const result = await contaCorrenteRepository.getExtrato(contaCorrenteId);

    if (result.length === 0) return result;

    return result;
  }
}

export default new ExtratoService();
