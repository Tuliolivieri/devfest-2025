import { Request, Response } from "express";

import solicitarEmprestimoService from "../services/solicitar-emprestimo.service";

export class SolicitarEmprestimoController {
  async execute(req: Request, res: Response) {
    const { cliente_id } = req.body;

    const result = await solicitarEmprestimoService.execute({
      cliente_id,
    });

    res.status(201).json({
      status: result.status,
      limite: result.limite,
      message: 'Cliente criado com sucesso',
    });
  }
}

export default new SolicitarEmprestimoController();
