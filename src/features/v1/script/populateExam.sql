--  for Exam Table ***********************************************************************

select exam.courseId, exam.semesterId,c.id as cId, s.id as sId,  s.semesterCode, c.courseCode, examType,   
 examCode, month, year  FROM exam 
 left join course as c on c.courseCode = exam.courseCode
 left join semester as s on s.semesterCode = exam.semesterCode

START TRANSACTION;

UPDATE exam AS e
LEFT JOIN course AS c ON c.courseCode = e.courseCode
LEFT JOIN semester AS s ON s.semesterCode = e.semesterCode
SET e.courseId = c.id,
    e.semesterId = s.id;

-- Verify the updated data in second_table
SELECT * FROM exam;

-- ROLLBACK;  if not updated proper

COMMIT;

-- For semester table ***********************************************************************

select s.courseId,s.courseCode, c.id as cId from semester as s
left join course as c  on c.courseCode = s.courseCode;

START TRANSACTION;

UPDATE semester AS s
left join course as c  on c.courseCode = s.courseCode
SET s.courseId = c.id

select * from semester;
commit;

-- For subject table ***********************************************************************

select sub.courseId, sub.semesterId, c.id as cId, s.id as sId from `subject` as sub
left join course as c on c.courseCode = sub.courseCode
left join semester as s on s.semesterCode = sub.semesterCode

START TRANSACTION;

UPDATE subject AS sub
left join course as c on c.courseCode = sub.courseCode
left join semester as s on s.semesterCode = sub.semesterCode
SET sub.courseId = c.id,
    sub.semesterId = s.id;
		
		
COMMIT;


-- For exam_subjects table ***********************************************************************

select  es.examCode, es.subjectCode, es.examId, es.subjectId, e.id as eId, s.id as sId
  FROM exam_subject as es
 left join exam as e on e.examCode = es.examCode
 left join `subject` as s on s.subjectCode = es.subjectCode

START TRANSACTION;

UPDATE exam_subject AS es
left join exam as e on e.examCode = es.examCode
left join `subject` as s on s.subjectCode = es.subjectCode
SET es.examId = e.id,
    es.subjectId = s.id;

-- Verify the updated data in second_table
SELECT * FROM exam_subject;

-- ROLLBACK;  if not updated proper

COMMIT;