import { Request, Response } from "express";
import solicitarEmprestimoService from "../services/solicitar-emprestimo.service";

export class SolicitarEmprestimoController {
  async execute(req: Request, res: Response) {
    const { documento } = req.body;

    await solicitarEmprestimoService.execute({
      documento,
    });

    res.status(202).json({
      message: 'Solicitação de limite recebida com sucesso. Em breve, você receberá um email com o resultado',
    });
  }
}

export default new SolicitarEmprestimoController();
