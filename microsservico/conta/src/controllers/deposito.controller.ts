import { Request, Response } from "express";
import depositoService from "../services/deposito.service";

class DepositoController {
  async execute(req: Request, res: Response) {
    const { contaId, valor } = req.body;

    const result = await depositoService.execute({
      contaId,
      valor,
    });

    res.status(200).json(result);
  }
}

export default new DepositoController();
