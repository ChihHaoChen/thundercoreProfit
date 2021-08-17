import { ProfitModel } from "./model/profit-model";
import { InvestorModel, InvestItemType } from "./model/investor-model";


const profitSystem = new ProfitModel(1)
console.log('🚀 ~ file: index.ts ~ line 5 ~ profitSystem', profitSystem)

const investorSteve = new InvestorModel('Steve')
Object.assign(profitSystem._investItem, investorSteve.addInvestment(10))

console.log('🚀 ~ file: index.ts ~ line 22 ~ profitSystem', profitSystem)

profitSystem.addProfit(20)
console.log('🚀 ~ file: index.ts ~ line 16 ~ profitSystem', profitSystem)


// 2nd investor is Dave
const investorDave = new InvestorModel('Dave')
Object.assign(profitSystem._investItem, investorDave.addInvestment(15))
console.log('🚀 ~ file: index.ts ~ line 19 ~ profitSystem', profitSystem)

// add profit(30)
profitSystem.addProfit(30)
console.log('🚀 ~ file: index.ts ~ line 23 ~ profitSystem', profitSystem)

// Dave put more money 
Object.assign(profitSystem._investItem, investorDave.addInvestment(25))
console.log('🚀 ~ file: index.ts ~ line 27 ~ profitSystem', profitSystem)


// Dave claims
const claimedAmount = profitSystem.responseToClaim(investorDave)
console.log('🚀 ~ file: index.ts ~ line 32 ~ claimed amount', claimedAmount)

// Proceed to session 2
profitSystem.newSession()
console.log('🚀 ~ file: index.ts ~ line 36 ~ ', profitSystem)

// Dave claims again
const claimedAmount2 = profitSystem.responseToClaim(investorDave)
console.log('🚀 ~ file: index.ts ~ line 32 ~ claimed amount', claimedAmount2)
console.log('🚀 ~ after Dave 2nd claim ~ ', profitSystem)

// Proceed to session 3
profitSystem.newSession()
console.log('🚀 ~ file: index.ts ~ line 45 ~ ', profitSystem)

// Now Steve invests
Object.assign(profitSystem._investItem, investorSteve.addInvestment(20))
console.log('🚀 ~ file: index.ts ~ line 49 ~ profitSystem', profitSystem)

// Steve wants to claim
const claimedAmountSteve = profitSystem.responseToClaim(investorSteve)
console.log('🚀 ~ file: index.ts ~ line 53 ~ claimed amount', claimedAmountSteve)
console.log('🚀 ~ after Steve invalid claim ~ ', profitSystem)

// add profit(35)
profitSystem.addProfit(35)
console.log('🚀 ~ file: index.ts ~ line 59 ~ profitSystem', profitSystem)

// Proceed to session 4
profitSystem.newSession()
console.log('🚀 ~ file: index.ts ~ line 45 ~ ', profitSystem)

// Steve wants to claim
const claimedAmountSteveSession4 = profitSystem.responseToClaim(investorSteve)
console.log('🚀 ~ file: index.ts ~ session 4 ~ claimed amount by Steve', claimedAmountSteveSession4)
console.log('🚀 ~ after Steve invalid claim ~ ', profitSystem)

// Dave wants to claim
const claimedAmountDaveSession4 = profitSystem.responseToClaim(investorDave)
console.log('🚀 ~ file: index.ts ~ session 4 ~ claimed amount by Dave', claimedAmountDaveSession4)
console.log('🚀 ~ after Steve invalid claim ~ ', profitSystem)