import { InvestorModel, Investor, InvestItemType } from "./investor-model"


export class ProfitModel {
  public _maxClaimableSession = 1
  public _investmentCurrentAmount: any
  
  public _profit: number
  private _profitRecords: number[]
  private _investmentRecords: any
  private _profitSharedSessions: any
  public _sessionCount = 1


  public constructor(maxClaimableSession: number) {
    this._maxClaimableSession = maxClaimableSession
    this._investmentCurrentAmount = {}
    this._profitSharedSessions = []
    this._investmentRecords = []
    this._profit = 0
    this._profitRecords = [0]
  }

  public newSession(): void {
    this._profitRecords.push(this._profit)
    // using _profitPreviousSession.lenght to judget if shift is necessary
    if ((this._sessionCount < this._maxClaimableSession) || (this._profitRecords.length > this._maxClaimableSession)) {
      this._profitRecords.shift()
      this._investmentRecords.shift()
    }
    
    this._investmentRecords.push(this._investmentCurrentAmount)
    // this._investItem = {}
    this._profit = 0
    this._sessionCount += 1
    this.calculateClaimableSession()
  }

  private calculateClaimableSession(): void {
    if (!this._investmentRecords) return
    
    this._investmentRecords.forEach((session: any, index: number) => {
      
      const totalEachSession: any = Object.values(session).reduce((sum: any, investedAmount: any) => investedAmount + sum, 0)
     
      const sharedAmountEachSession: any = {}
      Object.keys(session).map(invesotrName => {
        Object.assign(sharedAmountEachSession, { [invesotrName]: (session[invesotrName] / totalEachSession) * this._profitRecords[index] })
      })

      if (this._profitSharedSessions.length >= this._maxClaimableSession) {
        this._profitSharedSessions.shift()
      }
      this._profitSharedSessions.push(sharedAmountEachSession)
    })
  }

  public addProfit(addedProfit: number): void {
    this._profit += addedProfit
  }

  // public invest(investItem: InvestItemType): void {
  //   console.log('shared? =>', this._shared)
  //   // (this._investItem.length !== 0) ? this._investItem.push(investItem) : this._investItem = [investItem]
  //   this._investItem = investItem
  // }

  public responseToClaim(investor: Investor): number {
    if (this._profitRecords.length <= 0) return 0
    // this.calculateClaimableSession()
    
    const claimableForInvestor =
      this._profitSharedSessions.reduce((total: any, amount: any) => total + amount[investor._name], 0)

    return claimableForInvestor
  }

  private calculateInvestedAmountTotal() {
    return Object.values(this._investmentCurrentAmount).reduce((sum: any, item: any) => (sum + item), 0)
  }
}