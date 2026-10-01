Student Records Data Processor
A Node.js application that processes student records from a JSON file and generates student performance reports.

Features
Calculate average grades per student
Get top-performing students
Group students by course
Count enrolled and non-enrolled students
Search student records by name
Calculate average grades per course
Generate complete summary reports
Technologies Used
Node.js
JavaScript (ES6)
JSON
Project Structure
student-records-data-processor
├── app.js
├── students.json
└── README.md
Installation
Clone the repository:

git clone https://github.com/genemaecaramihan-15/student-records-data-processor.git
Go to the project folder:

cd student-records-data-processor
Run the application:

node app.js
Program Functions
getAverageGrade()
Calculates the average grade of a student.

getTopStudents()
Returns the top-performing students based on average grades.

groupByCourse()
Groups students according to their course.

getEnrolledCount()
Counts enrolled and non-enrolled students.

findStudent()
Searches for a student by name.

getCourseAverages()
Calculates the average grade for each course.

exportSummary()
Generates a complete summary report.

Sample Student Record
{
  "id": 1,
  "name": "Juan Dela Cruz",
  "year": 1,
  "course": "BSIT",
  "grades": [90, 88, 92, 91],
  "enrolled": true
}
Author
Gene Mae Caramihan

License
This project was created for educational purposes.
