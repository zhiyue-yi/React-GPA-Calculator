import { ICourse } from './course.interface';

export interface ISemester {
  year: number;
  term: number;
  courses: ICourse[];
}
