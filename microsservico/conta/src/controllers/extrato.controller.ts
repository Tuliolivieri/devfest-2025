import { Request, Response } from "express";
import extratoService from "../services/extrato.service";

class ExtratoController {
  async execute(req: Request, res: Response) {
    const { contaCorrenteId } = req.params;

    const result = await extratoService.execute(Number(contaCorrenteId));

    const status = result.length === 0 ? 204 : 200;

    res.status(status).json(result);
  }
}

export default new ExtratoController();
