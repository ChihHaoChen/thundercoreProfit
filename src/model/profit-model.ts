import { InvestorModel } from "./investor-model"


export interface InvestorOptions {
  investor: InvestorModel
  investedAmount: number
}

export class ProfitModel {
  public _maxClaimableSession = 1
  public _investors: InvestorModel[]
  public _profitAmount: number

  public _sessionCount = 0


  public constructor(maxClaimableSession: number) {
    this._maxClaimableSession = maxClaimableSession
    this._investors = []
    this._profitAmount = 0
  }

  private newSession(): void {
    this._sessionCount += 1
  }

  public addProfit(investorOption: InvestorOptions): void {
    this._profitAmount += investorOption.investedAmount
    this._investors.push(investorOption.investor)
  }
}