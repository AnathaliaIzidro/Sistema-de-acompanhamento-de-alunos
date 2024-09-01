document.addEventListener('DOMContentLoaded', function () {
    const newClassBtn = document.getElementById('newClassBtn');
    const addClassModal = document.getElementById('addClassModal');
    const closeButtons = document.querySelectorAll('.close');
    const classList = document.getElementById('classList');
    const addClassForm = document.getElementById('addClassForm');
    const addStudentForm = document.getElementById('addStudentForm');
    const addStudentModal = document.getElementById('addStudentModal');
    const addStudentBtn = document.getElementById('addStudentBtn');
    
    let classes = [];
    let currentClassIndex = 0;

    newClassBtn.addEventListener('click', () => openModal(addClassModal));
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            closeModal(button.closest('.modal'));
        });
    });

    addClassForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const className = document.getElementById('className').value;
        const classLessonCount = document.getElementById('classLessonInput').value;

        const newClass = {
            name: className,
            lessons: Number(classLessonCount),
            students: []
        };

        classes.push(newClass);
        updateClassList();
        closeModal(addClassModal);
    });

    addStudentBtn.addEventListener('click', () => openModal(addStudentModal));

    addStudentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const studentName = document.getElementById('studentName').value;
        const studentIssue = document.getElementById('studentIssue').value;

        const newStudent = {
            name: studentName,
            issue: studentIssue || null
        };

        classes[currentClassIndex].students.push(newStudent);
        updateStudentList();
        closeModal(addStudentModal);
    });

    function openModal(modal) {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }

    function updateClassList() {
        classList.innerHTML = '';
        classes.forEach((cls, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('class-item');
            listItem.textContent = cls.name;
            listItem.addEventListener('click', function () {
                currentClassIndex = index;
                updateClassDetails();
            });
            classList.appendChild(listItem);
        });
    }

    function updateClassDetails() {
        const currentClass = classes[currentClassIndex];
        document.getElementById('currentClass').textContent = currentClass.name;
        document.getElementById('studentCount').textContent = `Alunos: ${currentClass.students.length}`;
        document.getElementById('classLessonCount').textContent = `Aulas: ${currentClass.lessons}`;
        updateStudentList();
    }

    function updateStudentList() {
        const studentList = document.getElementById('studentList');
        const currentClass = classes[currentClassIndex];
        studentList.innerHTML = '';

        currentClass.students.forEach(student => {
            const listItem = document.createElement('li');
            listItem.classList.add('student-item');
            listItem.textContent = student.name;
            studentList.appendChild(listItem);
        });
    }
});
