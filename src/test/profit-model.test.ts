import { ProfitModel } from "../model/profit-model"

describe('Unit testing of profit-model', () => {

  it('Initializes a instance of ProfitModel and creates a new session', () => {
    const maxClaimableSession = 1
    const profitSystem = new ProfitModel(maxClaimableSession);
    
    expect(profitSystem._maxClaimableSession).toBe(maxClaimableSession)
    expect(profitSystem._sessionCount).toBe(1)
    expect(profitSystem._investmentCurrentAmount).toMatchObject({})
    expect(profitSystem._profit).toBe(0)
  })

  it('Adds profits to the system', () => {
    const maxClaimableSession = 1
    const profitAdded = 100
    const profitSystem = new ProfitModel(maxClaimableSession);

    profitSystem.addProfit(profitAdded)

    expect(profitSystem._profit).toBe(profitAdded)
  })

  it('Proceeds to a multiple of new sessions with profit reset and session count updated', () => {
    const maxClaimableSession = 1
    const profitSystem = new ProfitModel(maxClaimableSession);
    const numberOfNewSession = 2

    for (let i = 0; i < numberOfNewSession; i++) {
      profitSystem.newSession()
    }

    expect(profitSystem._profit).toBe(0)
    expect(profitSystem._sessionCount).toBe(1+numberOfNewSession)
  })
})