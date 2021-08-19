import { ProfitModel } from "../model/profit-model"
import { InvestorModel } from "../model/investor-model"

describe('Scenario Test 1', () => {
  
  it('Checks the scenario 1 with maxClaimableSession = 1', () => {
    // Starts a new sessiion
    const profitSystem = new ProfitModel(1)
    // Investor Steve invests $10
    const investorSteve = new InvestorModel('Steve')
    profitSystem._investmentCurrentAmount = { ...profitSystem._investmentCurrentAmount, ...investorSteve.addInvestment(10) } 
    expect(profitSystem._investmentCurrentAmount).toMatchObject({ Steve: 10 })

    // System adds profit $20 @ session1
    profitSystem.addProfit(20)
    expect(profitSystem._profit).toBe(20)

    // Investor Dave invests $15 @ session1
    const investorDave = new InvestorModel('Dave')
    profitSystem._investmentCurrentAmount = { ...profitSystem._investmentCurrentAmount, ...investorDave.addInvestment(15) }
    expect(profitSystem._investmentCurrentAmount).toMatchObject({ Steve: 10, Dave: 15 })

    // Systesm adds profit $80 @ session1
    profitSystem.addProfit(80)
    expect(profitSystem._profit).toBe(100)

    // Investor Dave invests $25 @ session1
    profitSystem._investmentCurrentAmount = { ...profitSystem._investmentCurrentAmount, ...investorDave.addInvestment(25) }
    expect(profitSystem._investmentCurrentAmount).toMatchObject({ Steve: 10, Dave: 40 })

    // Dave's invalid claim @ session1, system responds $0
    expect(profitSystem.responseToClaim(investorDave)).toBe(0)

    // System proceeds to seesion2
    profitSystem.newSession()
    expect(profitSystem._sessionCount).toBe(2)
    expect(profitSystem._profit).toBe(0)  // _profit reset
    
    // Dave's claim of his profit @ session2
    expect(profitSystem.responseToClaim(investorDave)).toBe(80)

    // System proceeds to session3
    profitSystem.newSession()
    expect(profitSystem._sessionCount).toBe(3)
    expect(profitSystem._profit).toBe(0)  // _profit reset

    // // Investor Dave invests $20 @ session3
    profitSystem._investmentCurrentAmount = { ...profitSystem._investmentCurrentAmount, ...investorSteve.addInvestment(20) }
    expect(profitSystem._investmentCurrentAmount).toMatchObject({ Steve: 30, Dave: 40 })

    // Steve's claim of his profit @ session3 gained from session2;
    // system should response $0 since no profit added in session2
    expect(profitSystem.responseToClaim(investorSteve)).toBe(0)

    // Systesm adds profit $35 @ session3
    profitSystem.addProfit(35)
    expect(profitSystem._profit).toBe(35)

    // System proceeds to seesion4
    profitSystem.newSession()
    expect(profitSystem._sessionCount).toBe(4)
    expect(profitSystem._profit).toBe(0)  // _profit reset

    // Both Steve and Dave claim their profits from session3,
    // and system should respond $15 and $20
    expect(profitSystem.responseToClaim(investorSteve)).toBe(15)
    expect(profitSystem.responseToClaim(investorDave)).toBe(20)
  })
})