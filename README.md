# README.md

## This repository aims to fulfill the assignment by ThunderCore

## The instructions for running this app locally:

Please ensure you have [Node.js](http://nodejs.org/) installed in your dev. environment.

```tsx
git clone https://github.com/ChihHaoChen/thundercoreProfit.git
cd thundercoreProfit
npm install
```

- Once the 3rd-party libraries are installed, please use the command

```tsx
npm run start:dev
```

to execute the three scenarios attached below.

- As for testing in this mini-project, [JEST](https://jestjs.io/) has been employed for both unit testing of models and the scenario testing. The command

```tsx
npm run test:watch
```

can be used to begin the testing with the interactive prompts:

```tsx
No tests found related to files changed since last commit.
Press `a` to run all tests, or run Jest with `--watchAll`.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

, where you can either type a to run all testing cases, or p to run the individual files in /src/test.

## Three different testing scenarios:

- The parameter MaxClaimableSession = 1 with four sessions where all operations are demonstrated with flow chart, and the claimable amounts for investors. This scenario 1 test is also included in /src/test.

![Example1-Scenario1_MaxClaimableSession=1.svg](flowchart/Example1-Scenario1_MaxClaimableSession1.svg)

- The parameter MaxClaimableSession = 2 with four sessions where all operations are demonstrated with flow chart, and the claimable amounts for investors. This scenario 2 test is also included in /src/test. Notice that due to maxClaimableSession = 2 in this case, arrays of length = 2 are adopted for storing the profit history, profits shared among investors, amounts of investment of investors in the previous two sessions after session 3. Before session 3, these arrays are only with length of 1. Furthermore, all these arrays get updated when profitSystem proceeds to a new session.

![Example1-Scenario2_MaxClaimableSession=2.svg](flowchart/Example1-Scenario2_MaxClaimableSession2.svg)

- On top of the scenario 2 test, scenario 3 includes the *withdraw* feature. The *withdraw* function reuses the code of the *addInvestment* function with a negative argument for the amount for withdrawing. This test scenario is also included in /src/test.

![Example1-Scenario3_MaxClaimableSession=2_withdraw.svg](flowchart/Example1-Scenario3_MaxClaimableSession2_withdraw.svg)
