/**
 * Financial Calculator Utilities
 * Contains functions for various financial calculations
 */

/**
 * Calculate compound interest
 * @param {number} principal - Initial investment amount
 * @param {number} rate - Annual interest rate (as decimal e.g. 0.05 for 5%)
 * @param {number} time - Time period in years
 * @param {number} frequency - Compounding frequency per year (e.g. 12 for monthly)
 * @param {number} contribution - Regular contribution amount
 * @param {string} contributionType - 'start' for beginning of period, 'end' for end of period
 * @returns {object} Final amount and interest earned
 */
export const calculateCompoundInterest = (
  principal,
  rate,
  time,
  frequency = 1,
  contribution = 0,
  contributionType = 'end'
) => {
  let finalAmount = principal;
  const periodicRate = rate / frequency;
  const totalPeriods = time * frequency;

  if (contribution === 0) {
    // Simple compound interest without contributions
    finalAmount = principal * Math.pow(1 + periodicRate, totalPeriods);
  } else {
    // Compound interest with regular contributions
    if (contributionType === 'end') {
      // Contributions made at the end of each period
      finalAmount = principal * Math.pow(1 + periodicRate, totalPeriods) +
        contribution * ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate);
    } else {
      // Contributions made at the start of each period
      finalAmount = principal * Math.pow(1 + periodicRate, totalPeriods) +
        contribution * ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate) * (1 + periodicRate);
    }
  }

  const interestEarned = finalAmount - principal - (contribution * totalPeriods);

  return {
    finalAmount: parseFloat(finalAmount.toFixed(2)),
    interestEarned: parseFloat(interestEarned.toFixed(2))
  };
};

/**
 * Calculate simple interest
 * @param {number} principal - Initial investment amount
 * @param {number} rate - Annual interest rate (as decimal)
 * @param {number} time - Time period in years
 * @returns {object} Final amount and interest earned
 */
export const calculateSimpleInterest = (principal, rate, time) => {
  const interestEarned = principal * rate * time;
  const finalAmount = principal + interestEarned;

  return {
    finalAmount: parseFloat(finalAmount.toFixed(2)),
    interestEarned: parseFloat(interestEarned.toFixed(2))
  };
};

/**
 * Calculate loan payments
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate (as decimal)
 * @param {number} years - Loan term in years
 * @returns {object} Monthly payment and amortization schedule
 */
export const calculateLoanPayments = (principal, annualRate, years) => {
  const monthlyRate = annualRate / 12;
  const totalPayments = years * 12;
  
  // Calculate monthly payment using the formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
  // where P is payment, L is loan amount, c is monthly interest rate, and n is number of payments
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  // Generate amortization schedule
  const schedule = [];
  let balance = principal;
  let totalInterest = 0;
  
  for (let i = 1; i <= totalPayments; i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    totalInterest += interestPayment;
    balance -= principalPayment;
    
    schedule.push({
      payment: i,
      principalPayment: parseFloat(principalPayment.toFixed(2)),
      interestPayment: parseFloat(interestPayment.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      balance: parseFloat(Math.max(0, balance).toFixed(2))
    });
  }
  
  return {
    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    totalCost: parseFloat((principal + totalInterest).toFixed(2)),
    schedule
  };
};

/**
 * Calculate retirement savings
 * @param {number} currentAge - Current age
 * @param {number} retirementAge - Expected retirement age
 * @param {number} lifeExpectancy - Expected life expectancy
 * @param {number} currentSavings - Current retirement savings
 * @param {number} monthlyContribution - Monthly contribution to retirement
 * @param {number} annualReturn - Expected annual return rate (as decimal)
 * @param {number} inflationRate - Expected inflation rate (as decimal)
 * @param {number} desiredIncome - Desired annual income during retirement
 * @param {number} socialSecurity - Expected annual social security income
 * @returns {object} Retirement projection details
 */
export const calculateRetirement = (
  currentAge,
  retirementAge,
  lifeExpectancy,
  currentSavings,
  monthlyContribution,
  annualReturn,
  inflationRate,
  desiredIncome,
  socialSecurity
) => {
  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;
  
  // Calculate future value of current savings at retirement
  const futureValueCurrentSavings = currentSavings * Math.pow(1 + annualReturn, yearsToRetirement);
  
  // Calculate future value of monthly contributions at retirement
  const monthlyRate = annualReturn / 12;
  const months = yearsToRetirement * 12;
  const futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  
  // Total savings at retirement
  const totalRetirementSavings = futureValueCurrentSavings + futureValueContributions;
  
  // Adjust desired income for inflation
  const inflationAdjustedIncome = desiredIncome * Math.pow(1 + inflationRate, yearsToRetirement);
  const inflationAdjustedSocialSecurity = socialSecurity * Math.pow(1 + inflationRate, yearsToRetirement);
  
  // Annual income needed from savings
  const annualIncomeFromSavings = inflationAdjustedIncome - inflationAdjustedSocialSecurity;
  
  // Calculate required savings using the 4% rule
  // The 4% rule suggests you can withdraw 4% of your savings in the first year of retirement
  // and adjust for inflation thereafter with a high probability of not running out of money
  const requiredSavings = annualIncomeFromSavings / 0.04;
  
  // Determine if there's a shortfall
  const savingsShortfall = Math.max(0, requiredSavings - totalRetirementSavings);
  
  // If there's a shortfall, calculate additional monthly contribution needed
  let additionalMonthlyContribution = 0;
  if (savingsShortfall > 0) {
    additionalMonthlyContribution = savingsShortfall / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) / (1 + monthlyRate);
  }
  
  return {
    totalRetirementSavings: parseFloat(totalRetirementSavings.toFixed(2)),
    requiredSavings: parseFloat(requiredSavings.toFixed(2)),
    savingsShortfall: parseFloat(savingsShortfall.toFixed(2)),
    currentMonthlyContribution: parseFloat(monthlyContribution.toFixed(2)),
    suggestedMonthlyContribution: parseFloat((monthlyContribution + additionalMonthlyContribution).toFixed(2)),
    yearsToRetirement,
    yearsInRetirement
  };
};

/**
 * Calculate pension projection
 * @param {number} currentSalary - Current annual salary
 * @param {number} contributionPercent - Percentage of salary contributed
 * @param {number} employerMatchPercent - Percentage matched by employer
 * @param {number} annualSalaryIncrease - Annual salary increase percentage
 * @param {number} annualReturnRate - Expected annual return rate
 * @param {number} currentAge - Current age
 * @param {number} retirementAge - Expected retirement age
 * @param {number} currentPensionValue - Current pension value
 * @returns {object} Pension projection details and year-by-year data
 */
export const calculatePension = (
  currentSalary,
  contributionPercent,
  employerMatchPercent,
  annualSalaryIncrease,
  annualReturnRate,
  currentAge,
  retirementAge,
  currentPensionValue
) => {
  const yearsToRetirement = retirementAge - currentAge;
  const yearlyData = [];
  
  let pensionValue = currentPensionValue;
  let salary = currentSalary;
  
  for (let year = 1; year <= yearsToRetirement; year++) {
    // Calculate contributions for this year
    const employeeContribution = salary * (contributionPercent / 100);
    const employerContribution = salary * Math.min(contributionPercent, employerMatchPercent) / 100;
    const totalContribution = employeeContribution + employerContribution;
    
    // Add investment returns
    const investmentReturns = pensionValue * (annualReturnRate / 100);
    
    // Update pension value
    pensionValue = pensionValue + totalContribution + investmentReturns;
    
    // Store data for this year
    yearlyData.push({
      year: currentAge + year,
      salary: parseFloat(salary.toFixed(2)),
      employeeContribution: parseFloat(employeeContribution.toFixed(2)),
      employerContribution: parseFloat(employerContribution.toFixed(2)),
      investmentReturns: parseFloat(investmentReturns.toFixed(2)),
      pensionValue: parseFloat(pensionValue.toFixed(2))
    });
    
    // Increase salary for next year
    salary = salary * (1 + annualSalaryIncrease / 100);
  }
  
  return {
    finalPensionValue: parseFloat(pensionValue.toFixed(2)),
    totalEmployeeContributions: parseFloat(yearlyData.reduce((sum, data) => sum + data.employeeContribution, 0).toFixed(2)),
    totalEmployerContributions: parseFloat(yearlyData.reduce((sum, data) => sum + data.employerContribution, 0).toFixed(2)),
    totalInvestmentReturns: parseFloat(yearlyData.reduce((sum, data) => sum + data.investmentReturns, 0).toFixed(2)),
    yearlyData
  };
};

/**
 * Calculate emergency fund requirements
 * @param {number} monthlyExpenses - Monthly expenses
 * @param {number} desiredMonthsCoverage - Desired months of expenses to cover
 * @param {number} currentSavings - Current emergency fund savings
 * @returns {object} Emergency fund requirements
 */
export const calculateEmergencyFund = (monthlyExpenses, desiredMonthsCoverage, currentSavings) => {
  const requiredFund = monthlyExpenses * desiredMonthsCoverage;
  const shortfall = Math.max(0, requiredFund - currentSavings);
  const fundingPercentage = Math.min(100, (currentSavings / requiredFund) * 100);
  
  return {
    monthlyExpenses: parseFloat(monthlyExpenses.toFixed(2)),
    requiredFund: parseFloat(requiredFund.toFixed(2)),
    currentSavings: parseFloat(currentSavings.toFixed(2)),
    shortfall: parseFloat(shortfall.toFixed(2)),
    fundingPercentage: parseFloat(fundingPercentage.toFixed(1))
  };
};

/**
 * Calculate net worth
 * @param {Array} assets - Array of asset objects with name, value, and category
 * @param {Array} liabilities - Array of liability objects with name, value, and category
 * @returns {object} Net worth details and categorized data
 */
export const calculateNetWorth = (assets, liabilities) => {
  // Calculate totals
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.value, 0);
  const netWorth = totalAssets - totalLiabilities;
  
  // Group assets by category
  const assetsByCategory = assets.reduce((categories, asset) => {
    const category = asset.category || 'Other';
    if (!categories[category]) {
      categories[category] = 0;
    }
    categories[category] += asset.value;
    return categories;
  }, {});
  
  // Group liabilities by category
  const liabilitiesByCategory = liabilities.reduce((categories, liability) => {
    const category = liability.category || 'Other';
    if (!categories[category]) {
      categories[category] = 0;
    }
    categories[category] += liability.value;
    return categories;
  }, {});
  
  // Format category data for charts
  const assetCategoriesForChart = Object.entries(assetsByCategory).map(([category, value]) => ({
    category,
    value: parseFloat(value.toFixed(2))
  }));
  
  const liabilityCategoriesForChart = Object.entries(liabilitiesByCategory).map(([category, value]) => ({
    category,
    value: parseFloat(value.toFixed(2))
  }));
  
  return {
    totalAssets: parseFloat(totalAssets.toFixed(2)),
    totalLiabilities: parseFloat(totalLiabilities.toFixed(2)),
    netWorth: parseFloat(netWorth.toFixed(2)),
    assetsByCategory: assetCategoriesForChart,
    liabilitiesByCategory: liabilityCategoriesForChart
  };
};