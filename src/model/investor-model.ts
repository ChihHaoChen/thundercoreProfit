export interface Investor {
  name: string
  investedAmount: number
  investedSession: number
}

type InvestDetail = {
  sessionCount: number,
  investedAmount: number
}

export class InvestorModel {
  public _name: string
  public _investDetail: InvestDetail[]


  public constructor(investor: Investor) {
    this._name = investor.name
    this._investDetail = []
  }

}