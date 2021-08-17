import { InvestorModel, Investor, InvestItemType } from "./investor-model"


export class ProfitModel {
  public _maxClaimableSession = 1
  public _investItem: any
  public _profit: number[]
  public _sessionCount = 1


  public constructor(maxClaimableSession: number) {
    this._maxClaimableSession = maxClaimableSession
    this._investItem = {}
    this._profit = [0]
  }

  public newSession(): void {
    if (this._sessionCount !== 1) {
      this._profit.shift()
    } 
    this._profit.push(0)
    this._sessionCount += 1 
  }

  public addProfit(addedProfit: number): void {
    if (this._sessionCount <= 1) {
      this._profit[this._sessionCount - 1] += addedProfit
    } else {
      this._profit[this._maxClaimableSession] += addedProfit
    }
  
  }

  public invest(investItem: InvestItemType): void {
    (this._investItem.length !== 0) ? this._investItem.push(investItem) : this._investItem = [investItem]
  }

  public responseToClaim(investor: Investor) {
    if (this._profit.length <= 1) return 0

    const investorPutAmount = this._investItem[investor._name]
    if (!investorPutAmount) return 0

    const totalInvestedAmount = Object.values(this._investItem).reduce((sum: any, item: any) => (sum + item), 0)
    if (!totalInvestedAmount) return 0

    const claimableAmount = this._profit[0] * investorPutAmount / (totalInvestedAmount as number)
    this._profit[0] -= claimableAmount
    // this._investItem[investor._name] -= claimableAmount
    
    return claimableAmount
    // return (this._sessionCount === 1) ? 0 : 0
  }
}