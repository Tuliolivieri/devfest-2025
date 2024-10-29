import database from "../database";

type MovimentacaoParams = {
  contaCorrenteId: number;
  tipoMovimentacaoId: number;
  valor: number;
};

class MovimentacaoRepository {
  async create(params: MovimentacaoParams) {
    const db = await database;

    const result = await db.query(
      "INSERT INTO tb_movimentacoes (conta_corrente_id, tipo_movimentacao_id, valor) VALUES ($1, $2, $3) RETURNING *",
      [params.contaCorrenteId, params.tipoMovimentacaoId, params.valor]
    );

    return {
      ...result.rows[0],
    };
  }
}

export default new MovimentacaoRepository();
