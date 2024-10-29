import { TiposTransacao } from "../enums/tipos-transacao";
import movimentacaoRepository from "../repositories/movimentacao.repository";

type DepositoDTO = {
  contaId: number;
  valor: number;
};

class DepositoService {
  async execute({ contaId, valor }: DepositoDTO) {
    const result = await movimentacaoRepository.create({
      contaCorrenteId: contaId,
      tipoMovimentacaoId: TiposTransacao.DEPOSITO,
      valor: Math.abs(valor),
    });

    return result;
  }
}

export default new DepositoService();
