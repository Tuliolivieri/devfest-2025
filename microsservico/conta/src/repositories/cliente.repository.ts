import database from '../database';

namespace SaveClienteParams {
  export type Params = {
    external_id: number;
    email: string;
    documento: string;
    nome: string;
  };

  export type Result = {
    id: number;
  }
}

class ClienteRepository {
  async save(params: SaveClienteParams.Params): Promise<SaveClienteParams.Result> {
    const result = await (await database).query(
      'INSERT INTO tb_clientes (documento, external_id, email, nome) VALUES ($1, $2, $3, $4) RETURNING *',
      [params.documento, params.external_id, params.email, params.nome]
    );
    return {
      id: result.rows[0].id,
    }
  }
}

export default new ClienteRepository();
