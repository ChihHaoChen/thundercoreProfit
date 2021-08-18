import { InvestorModel, Investor, InvestItemType } from "./investor-model"


export class ProfitModel {
  public _maxClaimableSession = 1
  public _investItem: any
  
  public _profit: number
  private _profitPreviousSession: number[]
  private _shared: any
  private _sharedAmountSessions: any
  public _sessionCount = 1


  public constructor(maxClaimableSession: number) {
    this._maxClaimableSession = maxClaimableSession
    this._investItem = {}
    this._sharedAmountSessions = []
    this._shared = []
    this._profit = 0
    this._profitPreviousSession = [0]
  }

  public newSession(): void {
    if (this._profitPreviousSession.length >= this._maxClaimableSession) {
      this._profitPreviousSession.shift()
    }
    this._profitPreviousSession.push(this._profit)
    this._shared.push(this._investItem)
    this._investItem = {}
    this._profit = 0
    this._sessionCount += 1
  }

  private calculateClaimableSession(): void {
    if (!this._shared) return
    
    this._shared.forEach((session: any, index: number) => {
      
      const totalEachSession: any = Object.values(session).reduce((sum: any, investedAmount: any) => investedAmount + sum, 0)
      
      const sharedAmountEachSession: any = {}
      Object.keys(session).map(invesotrName => {
        Object.assign(sharedAmountEachSession, { [invesotrName]: (session[invesotrName] / totalEachSession) * this._profitPreviousSession[index] })
      })
      
      this._sharedAmountSessions.push(sharedAmountEachSession)
    })
  }

  public addProfit(addedProfit: number): void {
    this._profit += addedProfit
  }

  public invest(investItem: InvestItemType): void {
    (this._investItem.length !== 0) ? this._investItem.push(investItem) : this._investItem = [investItem]
  }

  public responseToClaim(investor: Investor): number {
    if (this._profitPreviousSession.length <= 0) return 0
    this.calculateClaimableSession()
    
    const claimableForInvestor =
      this._sharedAmountSessions.reduce((total: any, amount: any) => total + amount[investor._name], 0)

    return claimableForInvestor
  }

  private calculateInvestedAmountTotal() {
    return Object.values(this._investItem).reduce((sum: any, item: any) => (sum + item), 0)
  }
}