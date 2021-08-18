export type Investor = {
  _name: string
}

export type InvestDetail = {
  _sessionCount: number,
  _investedAmount: number
}

export type InvestItemType = Investor | InvestDetail

export class InvestorModel {
  public _name: string
  public _investedTotal: number

  public constructor(_name: string) {
    this._name = _name
    this._investedTotal = 0
  }

  public addInvestment(investedAmount: number): {[key: string]: number} {
    this._investedTotal += investedAmount
    return { [this._name]: this._investedTotal}
  }


}