import pg from 'pg';
import database from '../database';

namespace SaveEmprestimoParams {
  export type Params = {
    cliente_id: number;
    limite: number;
    status: string;
  };

  export type Result = {
    id: number;
  } | null;
}

class EmprestimoRepository {
  async save(params: SaveEmprestimoParams.Params): Promise<SaveEmprestimoParams.Result> {
    const result = await (await database).query('INSERT INTO tb_emprestimos (cliente_id, limite, status) VALUES ($1, $2, $3) RETURNING *', [params.cliente_id, params.limite, params.status]);

    return {
      id: result.rows[0].id,
    }
  }
}

export default new EmprestimoRepository();
