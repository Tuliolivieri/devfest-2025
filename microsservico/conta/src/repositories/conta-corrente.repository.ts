import database from '../database';

type CreateParams = {
  clienteId: number;
  numero: number;
  digito: number;
  agencia: number;
}

type CreateResult = {
  cliente_id: number;
  numero: number;
  digito: number;
  agencia: number;
  criado_em: Date;
};

type GetExtratoResult = {
  cliente_id: number;
  numero: number;
  digito: number;
  agencia: number;
  valor: number;
  criado_em: Date;
  descricao: string;
}[];

class ContaCorrenteRepository {
  async create(params: CreateParams): Promise<CreateResult> {
    const db = await database;

    const result = await db.query(
      `INSERT INTO tb_contas_correntes (cliente_id, numero, digito, agencia)
        VALUES ($1, $2, $3, $4) 
        RETURNING cliente_id, numero, digito, agencia, criado_em`,
      [params.clienteId, params.numero, params.digito, params.agencia]
    );

    return {
      ...result.rows[0],
    };
  }

  async getSaldo(contaCorrenteId: number): Promise<number> {
    const db = await database;

    const result = await db.query(
      `SELECT COALESCE(SUM(valor), 0) as saldo
      FROM tb_contas_correntes cc
        INNER JOIN tb_movimentacoes mv
          ON cc.id = mv.conta_corrente_id
      WHERE cc.id = ${contaCorrenteId};
      `
    );

    return result.rows[0].saldo;
  }

  async getExtrato(contaCorrenteId: number): Promise<GetExtratoResult[]> {
    const db = await database;

    const result = await db.query(
      `SELECT
        cc.cliente_id,
        cc.numero,
        cc.digito,
        cc.agencia,
        mv.valor,
        mv.criado_em,
        tpmv.descricao
      FROM tb_contas_correntes cc
        INNER JOIN tb_movimentacoes mv
          ON cc.id = mv.conta_corrente_id
        INNER JOIN tb_tipo_movimentacao tpmv
          ON mv.tipo_movimentacao_id = tpmv.id
      WHERE cc.id = ${contaCorrenteId}
      GROUP BY cc.id, mv.id, tpmv.id;
      `
    );

    return result.rows;
  }
}

export default new ContaCorrenteRepository();
