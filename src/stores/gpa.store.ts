import { observable, action, computed } from 'mobx';
import { ISemester } from '../interfaces/semester.interface';
import { ICourse } from '../interfaces/course.interface';
import gradeSettingStore from './grade-settings.store';

export class GpaStore {
  @observable semesters: ISemester[] = [];

  @action addSemester = (year: number, term: number) => {
    const semester = { year, term, courses: [] };
    const semesters = [...this.semesters];
    semesters.push(semester);
    this.semesters = semesters;
  };

  @action removeSemester = (semester: ISemester) => {
    const index = this.semesters.indexOf(semester);
    const semesters = [...this.semesters];
    semesters.splice(index, 1);
    this.semesters = semesters;
  };

  @action addCourse = (semester: ISemester, course: ICourse) => {
    const index = this.semesters.indexOf(semester);
    const semesters = [...this.semesters];
    semesters[index].courses.push(course);
    this.semesters = semesters;
  };

  @action removeCourse = (semester: ISemester, course: ICourse) => {
    const semesterIndex = this.semesters.indexOf(semester);
    const courseIndex = this.semesters[semesterIndex].courses.indexOf(course);
    const semesters = [...this.semesters];
    semesters[semesterIndex].courses.splice(courseIndex, 1);
    this.semesters = semesters;
  };

  getTotalPoints(semester: ISemester) {
    const totalPoints = semester.courses.reduce(
      (point, course) =>
        point + course.credit * gradeSettingStore.getPoint(course.grade),
      0,
    );
    return totalPoints;
  }

  getTotalCredits(semester: ISemester) {
    const totalCredits = semester.courses.reduce(
      (credits, course) => credits + course.credit,
      0,
    );
    return totalCredits;
  }

  getGpa(semester: ISemester) {
    const points = this.getTotalPoints(semester);
    const credits = this.getTotalCredits(semester);
    const gpa = points / credits;
    return Math.round(gpa * 100) / 100;
  }

  @computed get cgpa() {
    const totalPoints = this.semesters.reduce(
      (points, semester) => points + this.getTotalPoints(semester),
      0,
    );

    const totalCredits = this.semesters.reduce(
      (credits, semester) => credits + this.getTotalCredits(semester),
      0,
    );
    const cgpa = Math.round((totalPoints / totalCredits) * 100) / 100;
    return cgpa;
  }

  @computed get count() {
    return this.semesters.length;
  }
}

const gpaStore = new GpaStore();
gpaStore.addSemester(2018, 1);
gpaStore.addSemester(2019, 2);

const semester1 = gpaStore.semesters[0];
gpaStore.addCourse(semester1, {
  name: 'Introduction to Computational Thinking',
  credit: 3,
  grade: 'A',
});
gpaStore.addCourse(semester1, {
  name: 'Software Engineering',
  credit: 3,
  grade: 'B+',
});
gpaStore.addCourse(semester1, {
  name: 'Operating System',
  credit: 4,
  grade: 'A-',
});

const semester2 = gpaStore.semesters[1];
gpaStore.addCourse(semester2, {
  name: 'Engineer and Society',
  credit: 3,
  grade: 'A-',
});
gpaStore.addCourse(semester2, { name: 'Algorithm', credit: 3, grade: 'B+' });
gpaStore.addCourse(semester2, {
  name: 'Communication Skills',
  credit: 2,
  grade: 'A-',
});

export default gpaStore;
