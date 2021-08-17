import { InvestorModel } from "./investor-model"


export interface InvestorOptions {
  investedAmount: number
}

export class ProfitModel {
  public _maxClaimableSession = 1
  public _investors: InvestorModel[]
  public _profitAmount: number

  public _sessionCount = 1


  public constructor(maxClaimableSession: number) {
    this._maxClaimableSession = maxClaimableSession
    this._investors = []
    this._profitAmount = 0
  }

  private newSession(): void {
    this._sessionCount += 1
  }

  public addProfit(investor: InvestorOptions): void {
    this._profitAmount += investor.investedAmount
  }
}