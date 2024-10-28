import pg from 'pg';
import database from '../database';

namespace SaveClienteParams {
  export type Params = {
    nome: string;
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
    nome: string;
    email: string;
    documento: string;
  } | null
}

class ClienteRepository {
  async save(params: SaveClienteParams.Params): Promise<SaveClienteParams.Result> {
    const result = await (await database).query('INSERT INTO tb_clientes (documento, nome, email) VALUES ($1, $2, $3) RETURNING *', [params.documento, params.nome, params.email]);
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
      nome: result.rows[0].nome,
      documento: result.rows[0].documento,
      email: result.rows[0].email,
    };
  }
}

export default new ClienteRepository();
