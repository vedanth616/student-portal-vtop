function login() {
    let reg = document.getElementById("regno").value;
    let pass = document.getElementById("password").value;

    if (reg === "" || pass === "") {
        alert("Enter all details");
        return;
    }

    localStorage.setItem("reg", reg);
    localStorage.setItem("name", "Vedanth");

    window.location.href = "dashboard.html";
}

function loadDashboard() {
    let name = localStorage.getItem("name");
    let reg = localStorage.getItem("reg");

    if (!name || !reg) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("name").innerText = name;
    document.getElementById("nameDisplay").innerText = name;
    document.getElementById("reg").innerText = reg;
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

function showSection(id) {
    let sections = document.querySelectorAll(".section");
    sections.forEach(sec => sec.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

function getGrade(mark) {
    if (mark >= 90) return "A+";
    if (mark >= 80) return "A";
    if (mark >= 70) return "B";
    if (mark >= 60) return "C";
    if (mark >= 50) return "D";
    return "F";
}

function calculateGPA() {
    let total = 0;

    for (let i = 1; i <= 6; i++) {
        let mark = parseInt(document.getElementById("m" + i).value) || 0;
        total += mark;
        document.getElementById("g" + i).innerText = getGrade(mark);
    }

    let avg = total / 6;
    let gpa = (avg / 10).toFixed(2);

    document.getElementById("gpa").innerText = gpa;
    document.getElementById("cgpa").innerText = gpa;
    document.getElementById("cgpaCard").innerText = gpa;
}

function calculateAttendance() {
    for (let i = 1; i <= 6; i++) {
        let a = parseInt(document.getElementById("a" + i).value) || 0;
        let t = parseInt(document.getElementById("t" + i).value) || 1;

        let p = ((a / t) * 100).toFixed(1);
        document.getElementById("p" + i).innerText = p + "%";
    }
}

function updateProfile() {
    let newName = document.getElementById("editName").value;

    if (newName === "") {
        alert("Enter name");
        return;
    }

    localStorage.setItem("name", newName);
    document.getElementById("name").innerText = newName;
    document.getElementById("nameDisplay").innerText = newName;
}

function searchContent() {
    let input = document.getElementById("search").value.toLowerCase();
    let sections = document.querySelectorAll(".section");

    sections.forEach(sec => {
        sec.style.display = sec.innerText.toLowerCase().includes(input)
            ? "block"
            : "none";
    });
}

function printPage() {
    window.print();
}