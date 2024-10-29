import { Request, Response } from "express";
import saqueService from "../services/saque.service";

class SaqueController {
  async execute(req: Request, res: Response) {
    const { contaId, valor } = req.body;

    const result = await saqueService.execute({
      contaId,
      valor,
    });

    res.status(200).json(result);
  }
}

export default new SaqueController();
