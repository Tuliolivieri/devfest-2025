import { TiposTransacao } from "../enums/tipos-transacao";
import contaCorrenteRepository from "../repositories/conta-corrente.repository";
import movimentacaoRepository from "../repositories/movimentacao.repository";

type SaqueDTO = {
  contaId: number;
  valor: number;
};

class SaqueService {
  async execute({ contaId, valor }: SaqueDTO) {
    const saldo = await contaCorrenteRepository.getSaldo(contaId);

    if (valor > saldo) {
      return { message: `Saldo insuficiente para o saque. Saldo disponível: ${saldo}`};
    }

    const result = await movimentacaoRepository.create({
      contaCorrenteId: contaId,
      tipoMovimentacaoId: TiposTransacao.SAQUE,
      valor: -Math.abs(valor),
    });

    return result;
  }
}

export default new SaqueService();
