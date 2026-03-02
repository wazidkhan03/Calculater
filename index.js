const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = "";
let operator = "";
let firstValue = "";
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        // Clear
        if (button.classList.contains("clear")) {
            currentInput = "";
            operator = "";
            firstValue = "";
            display.textContent = "0";
            return;
        }

        // Numbers and decimal
        if (!isNaN(value) || value === ".") {
            if (shouldResetDisplay) {
                currentInput = "";
                shouldResetDisplay = false;
            }
            currentInput += value;
            display.textContent = currentInput;
            return;
        }

        // Operators
        if (button.classList.contains("operator")) {
            if (currentInput === "") return;

            operator = value;
            firstValue = currentInput;
            shouldResetDisplay = true;
            return;
        }

        // Equals
        if (value === "=") {
            if (firstValue === "" || currentInput === "") return;

            let result;

            const num1 = parseFloat(firstValue);
            const num2 = parseFloat(currentInput);

            switch (operator) {
                case "+":
                    result = num1 + num2;
                    break;
                case "-":
                    result = num1 - num2;
                    break;
                case "*":
                    result = num1 * num2;
                    break;
                case "/":
                    result = num2 !== 0 ? num1 / num2 : "Error";
                    break;
                default:
                    return;
            }

            display.textContent = result;
            currentInput = result.toString();
            operator = "";
            firstValue = "";
            shouldResetDisplay = true;
        }
    });
});