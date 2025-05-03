const filterEvenNumbers = () => {
  const input = document.getElementById("numberInput").value.trim();
  const output = document.getElementById("output");

  if (!input) {
    output.textContent = "Please enter some numbers.";
    return;
  }

  const validFormat = /^\d+(\s*,\s*\d+)*$/;
  if (!validFormat.test(input)) {
    output.textContent = "Invalid input! Enter only numbers separated by commas.";
    return;
  }

  const numbers = input.split(",").map(num => Number(num.trim()));

  if (numbers.some(num => isNaN(num))) {
    output.textContent = "Please enter valid numbers only!";
    return;
  }

  if (numbers.some(num => num < 0)) {
    output.textContent = "Negative numbers detected! Please enter only positive numbers.";
    return;
  }

  const evenNumbers = numbers.filter(num => num % 2 === 0);

  output.textContent = evenNumbers.length
    ? `Even Numbers: ${evenNumbers.join(", ")}`
    : "No even numbers found!";
};
