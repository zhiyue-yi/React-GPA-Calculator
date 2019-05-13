import { GpaStore } from './gpa.store';

describe('GPA Store', () => {
  it('adds new semester', () => {
    const store = new GpaStore();
    store.addSemester('2016 Aug - Dec');
    store.addSemester('2017 Jan - May');

    expect(store.semesters.length).toBe(2);
    expect(store.semesters[1].name).toBe('2017 Jan - May');
  });

  it('removes a semester', () => {
    const store = new GpaStore();
    store.addSemester('2016 Aug - Dec');
    store.addSemester('2017 Jan - May');

    const semesterToRemove = store.semesters[0];
    store.removeSemester(semesterToRemove);

    expect(store.semesters.length).toBe(1);
    expect(store.semesters[0].name).toBe('2017 Jan - May');
  });

  it('adds new course', () => {
    const store = new GpaStore();
    store.addSemester('2016 Aug - Dec');
    store.addSemester('2017 Jan - May');

    const semester = store.semesters[0];
    store.addCourse(semester, {
      name: 'Introduction to Computational Thinking',
      credit: 3,
      grade: 'A',
    });
    store.addCourse(semester, {
      name: 'Software Engineering',
      credit: 3,
      grade: 'B+',
    });

    expect(store.semesters[0].courses.length).toBe(2);
    expect(store.semesters[0].courses[1].grade).toBe('B+');
  });

  it('removes a course', () => {
    const store = new GpaStore();
    store.addSemester('2016 Aug - Dec');
    store.addSemester('2017 Jan - May');

    const semester = store.semesters[0];
    store.addCourse(semester, {
      name: 'Introduction to Computational Thinking',
      credit: 3,
      grade: 'A',
    });
    store.addCourse(semester, {
      name: 'Software Engineering',
      credit: 3,
      grade: 'B+',
    });

    const courseToRemove = semester.courses[0];

    store.removeCourse(semester, courseToRemove);

    expect(store.semesters[0].courses.length).toBe(1);
    expect(store.semesters[0].courses[0].grade).toBe('B+');
  });
});

describe('GPA calculation', () => {
  const store = new GpaStore();
  store.addSemester('2016 Aug - Dec');
  store.addSemester('2017 Jan - May');

  const semester1 = store.semesters[0];
  store.addCourse(semester1, {
    name: 'Introduction to Computational Thinking',
    credit: 3,
    grade: 'A',
  });
  store.addCourse(semester1, {
    name: 'Software Engineering',
    credit: 3,
    grade: 'B+',
  });
  store.addCourse(semester1, {
    name: 'Operating System',
    credit: 4,
    grade: 'A-',
  });

  const semester2 = store.semesters[1];
  store.addCourse(semester2, {
    name: 'Engineer and Society',
    credit: 3,
    grade: 'A-',
  });
  store.addCourse(semester2, { name: 'Algorithm', credit: 3, grade: 'B+' });
  store.addCourse(semester2, {
    name: 'Communication Skills',
    credit: 2,
    grade: 'A-',
  });

  it('should get total points correct', () => {
    const points1 = store.getTotalPoints(store.semesters[0]);
    const points2 = store.getTotalPoints(store.semesters[1]);

    expect(points1).toBe(45);
    expect(points2).toBe(34.5);
  });

  it('should get total credits correct', () => {
    const credits1 = store.getTotalCredits(store.semesters[0]);
    const credits2 = store.getTotalCredits(store.semesters[1]);

    expect(credits1).toBe(10);
    expect(credits2).toBe(8);
  });

  it('should calculate GPA in current semester correctly', () => {
    const gpa1 = store.getGpa(store.semesters[0]);
    const gpa2 = store.getGpa(store.semesters[1]);

    expect(gpa1).toBe(4.5);
    expect(gpa2).toBe(4.31);
  });

  it('should calculate CGPA correctly', () => {
    const cgpa = store.cgpa;
    expect(cgpa).toBe(4.42);
  });
});
