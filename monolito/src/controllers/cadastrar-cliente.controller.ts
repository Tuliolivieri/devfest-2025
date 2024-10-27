import { Request, Response } from "express";
import cadastrarClienteService from "../services/cadastrar-cliente.service";

export class CadastrarClienteController {
  async execute(req: Request, res: Response) {
    const { email, nome, documento } = req.body;

    const result = await cadastrarClienteService.execute({
      email,
      nome,
      documento,
    });

    res.status(201).json({
      id: result.id,
      message: 'Cliente criado com sucesso',
    });
  }
}

export default new CadastrarClienteController();
