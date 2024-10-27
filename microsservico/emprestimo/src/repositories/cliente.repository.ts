import pg from 'pg';
import database from '../database';

namespace SaveClienteParams {
  export type Params = {
    external_id: number;
    email: string;
    documento: string;
  };

  export type Result = {
    id: number;
  }
}

namespace FindClienteByIdParams {
  export type Params = {
    documento: string;
  };

  export type Result = {
    id: number;
    email: string;
    documento: string;
    external_id: number;
  } | null
}

class ClienteRepository {
  async save(params: SaveClienteParams.Params): Promise<SaveClienteParams.Result> {
    const result = await (await database).query('INSERT INTO tb_clientes (documento, external_id, email) VALUES ($1, $2, $3) RETURNING *', [params.documento, params.external_id, params.email]);
    return {
      id: result.rows[0].id,
    }
  }

  async findByDocument(params: FindClienteByIdParams.Params): Promise <FindClienteByIdParams.Result> {
    const result = await (await database).query('SELECT * FROM tb_clientes WHERE documento = $1', [params.documento]);

    if (result.rows.length === 0) {
      return null;
    }

    return {
      id: result.rows[0].id,
      external_id: result.rows[0].external_id,
      documento: result.rows[0].documento,
      email: result.rows[0].email,
    };
  }
}

export default new ClienteRepository();
