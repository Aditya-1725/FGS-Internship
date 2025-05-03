function calculateGrade() {
    let marks = document.getElementById("marks").value;
    let result = document.getElementById("result");
    
    if (marks === "") {
        result.innerHTML = "Please enter your marks!";
        result.style.color = "#e94560";
        return;
    }

    marks = parseFloat(marks);

    if (marks < 0 || marks > 100) {
        result.innerHTML = "Enter marks between 0 and 100!";
        result.style.color = "#e94560";
        return;
    }

    let grade = "";

    if (marks >= 90) {
        grade = "Congratulation! You got A+ Grade";
    } else if (marks >= 80) {
        grade = "Congratulations! You got A Grade";
    } else if (marks >= 70) {
        grade = "Good, you got B Grade";
    } else if (marks >= 60) {
        grade = "Good, you got C Grade";
    } else if (marks >= 50) {
        grade = "Average, you got D Grade";
    } else {
        grade = "Sorry, you are Fail";
    }

    result.innerHTML = grade;
}
