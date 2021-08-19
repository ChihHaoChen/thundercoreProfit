import { Investor } from "./investor-model"

export class ProfitModel {
  public _maxClaimableSession = 1
  public _investmentCurrentAmount: any
  public _profit: number
  public _sessionCount = 1
  
  private _profitRecords: number[]
  private _investmentRecords: any
  private _profitSharedSessions: any

  public constructor(maxClaimableSession: number) {
    this._maxClaimableSession = maxClaimableSession
    this._investmentCurrentAmount = {}
    this._profit = 0
    
    this._profitSharedSessions = []
    this._investmentRecords = []
    this._profitRecords = [0]
  }

  // this function allows the system to proceed to a new session
  public newSession(): void {
    this._profitRecords.push(this._profit)
    // using _profitPreviousSession.length to judget if shift is necessary
    // shift function here is used to limit the length of arrays to record the profits and investment from investors 
    // based on the number _maxClaimableSession
    if ((this._sessionCount < this._maxClaimableSession) || (this._profitRecords.length > this._maxClaimableSession)) {
      this._profitRecords.shift()
      this._investmentRecords.shift()
    }
    
    this._investmentRecords.push(this._investmentCurrentAmount) // pushes the current investment profile into records
    this._profit = 0
    this._sessionCount += 1
    this.calculateClaimableSession()
  }

  // this function calculates the weighted claimable profits based on the investment records of investors in sessions
  private calculateClaimableSession(): void {
    if (!this._investmentRecords) return
    
    this._investmentRecords.forEach((session: any, index: number) => {
      
      const totalEachSession: any = Object.values(session).reduce((sum: any, investedAmount: any) => investedAmount + sum, 0)
     
      const sharedAmountEachSession: any = {}
      Object.keys(session).map(invesotrName => {
        Object.assign(sharedAmountEachSession, { [invesotrName]: (session[invesotrName] / totalEachSession) * this._profitRecords[index] })
      })
      // here we keep the length of array <= this._maxClaimableSession because the profits in previous sessions expire
      if (this._profitSharedSessions.length >= this._maxClaimableSession) {
        this._profitSharedSessions.shift()
      }
      this._profitSharedSessions.push(sharedAmountEachSession)
    })
  }

  // this function allows adding profits to the system
  public addProfit(addedProfit: number): void {
    this._profit += addedProfit
  }

  // this function calculates the claimable amount from this._profitSharedSessions
  public responseToClaim(investor: Investor): number {
    if (this._profitRecords.length <= 0) return 0
    
    const claimableForInvestor =
      this._profitSharedSessions.reduce((total: any, amount: any) => total + amount[investor._name], 0)

    return claimableForInvestor
  }

  // this function calculates the total amount of investment from all investors in a specific session
  private calculateInvestedAmountTotal() {
    return Object.values(this._investmentCurrentAmount).reduce((sum: any, item: any) => (sum + item), 0)
  }
}