import { Request, Response } from "express";

import solicitarEmprestimoService from "../services/solicitar-emprestimo.service";

export class SolicitarEmprestimoController {
  async execute(req: Request, res: Response) {
    const { documento } = req.body;

    const result = await solicitarEmprestimoService.execute({
      documento
    });

    res.status(201).json({
      status: result.status,
      limite: result.limite,
    });
  }
}

export default new SolicitarEmprestimoController();
