import { ProfitModel } from "./model/profit-model";
import { InvestorModel } from "./model/investor-model";

export function test2():void {

  const profitSystem = new ProfitModel(2)
  console.log('After init a new seeions', profitSystem)

  const investorSteve = new InvestorModel('Steve')
  profitSystem._investmentCurrentAmount = {...profitSystem._investmentCurrentAmount, ...investorSteve.addInvestment(10)}

  console.log('After Steve invested $10 @ session 1, ', profitSystem)

  profitSystem.addProfit(20)
  console.log('After addProfit(20) @ session 1', profitSystem)


  // 2nd investor is Dave
  const investorDave = new InvestorModel('Dave')
  profitSystem._investmentCurrentAmount = {...profitSystem._investmentCurrentAmount, ...investorDave.addInvestment(15)}
  console.log('After Dave invested $15 @ session 1 ', profitSystem)

  // add profit(30)
  profitSystem.addProfit(30)
  console.log('After addProfit(30) @ session 1', profitSystem)

  // Dave put more money 
  profitSystem._investmentCurrentAmount = {...profitSystem._investmentCurrentAmount, ...investorDave.addInvestment(25)}
  console.log('After Dave second investment of $25 @ session 1, ', profitSystem)


  // Dave claims
  const claimedAmount = profitSystem.responseToClaim(investorDave)
  console.log('Dave invalid claim @ session 1', claimedAmount)
  console.log('After Dave invalid claim @ session 1', profitSystem)

  // Proceed to session 2
  profitSystem.newSession()
  console.log('After moving to session 2', profitSystem)

  // Dave claims again
  const claimedAmount2 = profitSystem.responseToClaim(investorDave)
  console.log('Dave wants to claim @ session 2', claimedAmount2)
  console.log('Session after Dave another claim @ session 2 ~ ', profitSystem)

  // Add profit $150
  // Proceed to session 3
  profitSystem.addProfit(150)
  console.log('After adding profit of $150', profitSystem)

  // Proceed to session 3 
  profitSystem.newSession()
  console.log('Proceeding to session 3', profitSystem)

  // Now Steve invests
  // Object.assign(profitSystem._investItem, investorSteve.addInvestment(20))
  profitSystem._investmentCurrentAmount = {...profitSystem._investmentCurrentAmount, ...investorSteve.addInvestment(20)}
  console.log('After Steve investment of $20', profitSystem)

  // Steve wants to claim
  const claimedAmountSteve = profitSystem.responseToClaim(investorSteve)
  console.log('Steve wants to claim @ session 3', claimedAmountSteve)
  console.log('After Steve invalid claim ~ ', profitSystem)

  // add profit(35)
  profitSystem.addProfit(35)
  console.log('After addProfit(35) @ session 3', profitSystem)

  // Proceed to session 4
  profitSystem.newSession()
  console.log('Moving to session 4', profitSystem)

  // Steve wants to claim
  const claimedAmountSteveSession4 = profitSystem.responseToClaim(investorSteve)
  console.log('Claimable for Steve @ session 4', claimedAmountSteveSession4)
  console.log('After Steve claim @ session 4', profitSystem)

  // Dave wants to claim
  const claimedAmountDaveSession4 = profitSystem.responseToClaim(investorDave)
  console.log('Claimable for Dave @ session 4', claimedAmountDaveSession4)
  console.log('After Dave claim @ session 4', profitSystem)
}