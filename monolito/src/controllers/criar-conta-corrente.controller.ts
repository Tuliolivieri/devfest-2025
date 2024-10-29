import { Request, Response } from "express";
import criarContaCorrenteService from "../services/criar-conta-corrente.service";

export class CriarContaCorrenteController {
  async execute(req: Request, res: Response) {
    const { clienteId, numero, digito, agencia } = req.body;

    const result = await criarContaCorrenteService.execute({
      clienteId,
      numero,
      digito,
      agencia,
    });

    res.status(201).json(result);
  }
}

export default new CriarContaCorrenteController();
