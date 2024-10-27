type Params = {
  email: string;
}

type Result = {
  limite: number;
  probabilidade: number
}

class AnalisarLimite {
  async execute(params :Params): Promise<Result> {
    const probabilidade = Math.random();

    const limite = this.getLimite(probabilidade);

    return {
      probabilidade,
      limite,
    };
  }

  private getLimite(probabilidade: number): number {
    if (probabilidade > 0.8) return 100000;
    if (probabilidade > 0.4) return 50000;
    if (probabilidade > 0.2) return 10000;
    return 0;
  }
}

export default new AnalisarLimite();
