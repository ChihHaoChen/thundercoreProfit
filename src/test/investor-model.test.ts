import { InvestorModel } from "../model/investor-model"

describe('Unit testing of profit-model', () => {


  it('Initializes a instance of InvestorModel with investor name and zero amount', () => {
    const name = 'Steve'
    const newInvestor = new InvestorModel(name)

    expect(newInvestor._name).toBe(name)
    expect(newInvestor._investedTotal).toBe(0)
  })

  it('Allows investors to add money', () => {
    const name = 'Steve'
    const newInvestor = new InvestorModel(name)
    const cashDeposited = 100

    newInvestor.addInvestment(cashDeposited)

    expect(newInvestor._investedTotal).toBe(cashDeposited)
  })

  it('Allows investors to withdraw money', () => {
    const name = 'Steve'
    const newInvestor = new InvestorModel(name)
    const cashDeposited = 100
    const cashWithdrawn = 50
    const cashSum = cashDeposited - cashWithdrawn

    newInvestor.addInvestment(cashDeposited)
    newInvestor.addInvestment(-cashWithdrawn)

    expect(newInvestor._investedTotal).toBe(cashSum)
  })

  it('Notifies an error message when withdrawing more than the deposited amount', () => {
    const name = 'Steve'
    const newInvestor = new InvestorModel(name)
    const cashDeposited = 50
    const cashWithdrawn = 100

    newInvestor.addInvestment(cashDeposited)
    
    try {
      newInvestor.addInvestment(-cashWithdrawn)
    } catch (e) {
      expect(e.message).toBe("You shouldn't withdraw more than you deposited.");
    }

  })
})