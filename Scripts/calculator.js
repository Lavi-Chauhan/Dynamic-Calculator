document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculate");
    const clearButton = document.getElementById("clear");
    const historyList = document.getElementById("history");
    const clearHistoryButton = document.getElementById("clearHistory");

    calculateButton.addEventListener("click", function () {
        const number1 = document.getElementById("number1").value;
        const number2 = document.getElementById("number2").value;
        const operation = document.getElementById("operation").value;
        const currency = document.getElementById("currency").value;
        if (!validateNumber(number1)) {
            document.getElementById('Numbers-error').innerHTML = "Please enter a valid Number 1 (0-999999).";
            document.getElementById("number1").focus();
            return false;
        }
        else {
            document.getElementById('Numbers-error').innerHTML = "";
        }
        if (!validateNumber(number2)) {
            document.getElementById('Numbers2-error').innerHTML = "Please enter a valid Number 1 (0-999999).";
            document.getElementById("number2").focus();
            return false;
        }
        else {
            document.getElementById('Numbers2-error').innerHTML = "";
        }
        if (operation === '') {
            document.getElementById('operation-error').innerHTML = "Please select an operation.";
            document.getElementById("operation").focus();
            return false;
        }
        else {
            document.getElementById('operation-error').innerHTML = "";
        }
        if (currency === '') {
            document.getElementById('currency-error').innerHTML = "Please select a currency.";
            document.getElementById("currency").focus();
            return false;
        }
        else {
            document.getElementById('currency-error').innerHTML = "";
        }

        let result;
        const num1 = parseFloat(number1);
        const num2 = parseFloat(number2);

        switch (operation) {
            case "add":
                result = num1 + num2;
                break;
            case "subtract":
                result = num1 - num2;
                break;
            case "multiply":
                result = num1 * num2;
                break;
            case "divide":
                result = num2 !== 0 ? num1 / num2 : "Error (Div by 0)";
                break;
            case "sqrt":
                result = Math.sqrt(num1);
                break;
            case "power":
                result = Math.pow(num1, num2);
                break;
            case "simpleInterest":
                result = (num1 * num2 * 0.01).toFixed(2);
                break;
            case "compoundInterest":
                const principal = num1;
                const rate = num2 / 100;
                const time = parseFloat(prompt("Enter the time in years:"));
                result = (principal * Math.pow(1 + rate, time) - principal).toFixed(2);
                break;
            case "emiCalculation":
                const loanAmount = num1;
                const annualRate = num2 / 100;
                const tenureInYears = parseFloat(prompt("Enter the loan tenure in years:"));
                result = calculateEMI(loanAmount, annualRate, tenureInYears).toFixed(2);
                break;
            case "investmentGrowth":
                const investmentAmount = num1;
                const monthlyContribution = num2;
                const growthRate = parseFloat(prompt("Enter the annual growth rate (in %):"));
                const investmentYears = parseFloat(prompt("Enter the number of years:"));
                result = calculateInvestmentGrowth(investmentAmount, monthlyContribution, growthRate, investmentYears).toFixed(2);
                break;
            default:
                result = "Invalid Operation";
                break;
        }

        const formattedResult = `${currency} ${result}`;
        document.getElementById("result").innerText = formattedResult;

        // Add to history
        const historyEntry = document.createElement("li");
        historyEntry.innerText = `${num1} ${operation} ${num2} = ${formattedResult}`;
        historyList.appendChild(historyEntry);
    });

    // Clear button logic
    clearButton.addEventListener("click", function () {
        // Clear input fields
        document.getElementById("number1").value = '';
        document.getElementById("number2").value = '';
        document.getElementById("result").innerText = 'Rs 0';
        document.getElementById("operation").selectedIndex = 0;
        document.getElementById("currency").selectedIndex = 0;
        // Clear error messages
        $("#Numbers-error").empty();
        $("#Numbers2-error").empty();
        $("#operation-error").empty();
        $("#currency-error").empty();

    });

    clearHistoryButton.addEventListener("click", function () {
        historyList.innerHTML = '';
    });
});

function calculateEMI(principal, annualRate, tenureInYears) {
    const monthlyRate = annualRate / 12;
    const tenureInMonths = tenureInYears * 12;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) /
        (Math.pow(1 + monthlyRate, tenureInMonths) - 1);

    return emi;
}

function calculateInvestmentGrowth(investment, contribution, rate, years) {
    let total = investment;
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;

    for (let month = 1; month <= totalMonths; month++) {
        total += contribution;
        total *= (1 + monthlyRate);
    }

    return total;
}

function validateInput(input) {
    // Get the current value of the input
    let value = input.value;

    // Remove any non-digit characters (optional, for extra validation)
    value = value.replace(/\D/g, '');

    // Limit the value to 6 digits
    if (value.length > 6) {
        value = value.slice(0, 6);
    }

    // Set the updated value back to the input
    input.value = value;
}
function validateNumber(value) {
    const numberPattern = /^\d{1,6}$/;
    return numberPattern.test(value);
}