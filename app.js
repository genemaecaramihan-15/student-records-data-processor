const fs = require("fs");

// Read students.json
const data = fs.readFileSync("students.json", "utf8");
const students = JSON.parse(data);


// 1. Get the average grade of one student
function getAverageGrade(student) {
    if (!student || !Array.isArray(student.grades) || student.grades.length === 0) {
        return 0;
    }

    const total = student.grades.reduce((sum, grade) => sum + grade, 0);

    return total / student.grades.length;
}


// 2. Get the top N students
function getTopStudents(students, n) {
    if (!Array.isArray(students)) {
        throw new Error("students must be an array.");
    }

    if (!Number.isInteger(n) || n < 0) {
        throw new Error("n must be a non-negative integer.");
    }

    return students
        .map(student => ({
            ...student,
            averageGrade: getAverageGrade(student)
        }))
        .sort((a, b) => b.averageGrade - a.averageGrade)
        .slice(0, n);
}


// 3. Group students by course
function groupByCourse(students) {
    if (!Array.isArray(students)) {
        throw new Error("students must be an array.");
    }

    return students.reduce((groups, student) => {
        const course = student.course || "Unknown";

        if (!groups[course]) {
            groups[course] = [];
        }

        groups[course].push({ ...student });

        return groups;
    }, {});
}


// 4. Get enrolled and not enrolled counts
function getEnrolledCount(students) {
    if (!Array.isArray(students)) {
        throw new Error("students must be an array.");
    }

    return {
        enrolled: students.filter(student => student.enrolled === true).length,
        notEnrolled: students.filter(student => student.enrolled === false).length
    };
}


// 5. Find a student by name
function findStudent(students, name) {
    if (!Array.isArray(students)) {
        throw new Error("students must be an array.");
    }

    if (typeof name !== "string") {
        throw new Error("name must be a string.");
    }

    const searchName = name.trim().toLowerCase();

    const student = students.find(
        student => student.name.toLowerCase() === searchName
    );

    return student ? { ...student } : null;
}


// 6. Get average grade for each course
function getCourseAverages(students) {
    if (!Array.isArray(students)) {
        throw new Error("students must be an array.");
    }

    const grouped = groupByCourse(students);

    return Object.entries(grouped)
        .map(([course, courseStudents]) => {
            const studentsWithGrades = courseStudents.filter(
                student => Array.isArray(student.grades) && student.grades.length > 0
            );

            const average =
                studentsWithGrades.length === 0
                    ? 0
                    : studentsWithGrades.reduce(
                        (sum, student) => sum + getAverageGrade(student),
                        0
                    ) / studentsWithGrades.length;

            return {
                course,
                averageGrade: average
            };
        })
        .sort((a, b) => b.averageGrade - a.averageGrade);
}


// 7. Export summary
function exportSummary(students) {
    if (!Array.isArray(students)) {
        throw new Error("students must be an array.");
    }

    const studentsWithGrades = students.filter(
        student => Array.isArray(student.grades) && student.grades.length > 0
    );

    const overallAverage =
        studentsWithGrades.length === 0
            ? 0
            : studentsWithGrades.reduce(
                (sum, student) => sum + getAverageGrade(student),
                0
            ) / studentsWithGrades.length;

    const topStudent = getTopStudents(students, 1)[0] || null;

    return {
        totalStudents: students.length,
        overallAverageGrade: overallAverage,
        topPerformingStudent: topStudent,
        breakdownByCourse: getCourseAverages(students)
    };
}


// Main function
function main() {
    console.log("==========================================");
    console.log("       STUDENT RECORDS DATA REPORT");
    console.log("==========================================");

    // Total students
    console.log("\n1. TOTAL NUMBER OF STUDENTS");
    console.log("------------------------------------------");
    console.log(`Total Students: ${students.length}`);


    // Overall average
    console.log("\n2. OVERALL AVERAGE GRADE");
    console.log("------------------------------------------");

    const summary = exportSummary(students);

    console.log(
        `Overall Average Grade: ${summary.overallAverageGrade.toFixed(2)}`
    );


    // Enrolled count
    console.log("\n3. ENROLLMENT COUNT");
    console.log("------------------------------------------");

    const enrollment = getEnrolledCount(students);

    console.log(`Enrolled: ${enrollment.enrolled}`);
    console.log(`Not Enrolled: ${enrollment.notEnrolled}`);


    // Top students
    console.log("\n4. TOP-PERFORMING STUDENTS");
    console.log("------------------------------------------");

    const topStudents = getTopStudents(students, 3);

    if (topStudents.length === 0) {
        console.log("No students found.");
    } else {
        topStudents.forEach((student, index) => {
            console.log(
                `${index + 1}. ${student.name} - ${student.averageGrade.toFixed(2)}`
            );
        });
    }


    // Course averages
    console.log("\n5. AVERAGE GRADE BY COURSE");
    console.log("------------------------------------------");

    const courseAverages = getCourseAverages(students);

    if (courseAverages.length === 0) {
        console.log("No course data available.");
    } else {
        courseAverages.forEach(course => {
            console.log(
                `${course.course}: ${course.averageGrade.toFixed(2)}`
            );
        });
    }


    // Grouped students
    console.log("\n6. STUDENTS GROUPED BY COURSE");
    console.log("------------------------------------------");

    const groupedStudents = groupByCourse(students);

    Object.entries(groupedStudents).forEach(([course, courseStudents]) => {
        console.log(`\n${course}:`);

        courseStudents.forEach(student => {
            console.log(`- ${student.name}`);
        });
    });


    // Search example
    console.log("\n7. STUDENT SEARCH");
    console.log("------------------------------------------");

    const searchResult = findStudent(students, "Maria Santos");

    if (searchResult) {
        console.log(`Student Found: ${searchResult.name}`);
        console.log(`Course: ${searchResult.course}`);
        console.log(`Year: ${searchResult.year}`);
    } else {
        console.log("Student not found.");
    }


    // Complete summary
    console.log("\n8. COMPLETE SUMMARY");
    console.log("------------------------------------------");
    console.log(JSON.stringify(summary, null, 2));

    console.log("\n==========================================");
    console.log("             REPORT COMPLETE");
    console.log("==========================================");
}


// Run the program
main();
