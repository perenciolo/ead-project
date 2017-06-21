import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class CoursesService {

  constructor(private db: AngularFireDatabase) { }

  findAllCourses(): Observable<Course[]> {
    return this.db.list('courses').map(Course.fromJSONArray);
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.list('courses',
      {
        query: {
          orderByChild: 'url',
          equalTo: courseUrl
        }
      })
      .do(console.log)
      .map(results => results[0]);
  }

  findLessonKeysPerCourseUrl(courseUrl: string, query: FirebaseListFactoryOpts = {}): Observable<string[]> {
    return (
      this.findCourseByUrl(courseUrl)
        .do(val => console.log('Course', val))
        .filter(course => !!course)
        .switchMap(course => this.db.list(`lessonsPerCourse/${course.$key}`, query))
        .map(lspc => lspc.map(lessonPerCourse => lessonPerCourse.$key))
    );
  }

  findLessonsForLessonsKeys(lessonsKeys$: Observable<string[]>): Observable<Lesson[]> {
    return (
      lessonsKeys$
        .map(lspc => lspc.map(lessonKey => this.db.object(`lessons/${lessonKey}`)))
        .flatMap(fbojs => Observable.combineLatest(fbojs))
    );
  }

  findAllLessonsForCourse(courseUrl: string): Observable<Lesson[]> {
    return this.findLessonsForLessonsKeys(this.findLessonKeysPerCourseUrl(courseUrl));
  }

  loadFirstLessonsPage(courseUrl: string, pageSize: number): Observable<Lesson[]> {

    const firstPageLessonKeys$ = this.findLessonKeysPerCourseUrl(courseUrl, {
      query: {
        limitToFirst: pageSize
      }
    });
    return this.findLessonsForLessonsKeys(firstPageLessonKeys$);
  }

  loadNextPage(courseUrl: string, lessonKey: string, pageSize: number): Observable<Lesson[]> {
    const lessonKeys$ = this.findLessonKeysPerCourseUrl(courseUrl, {
      query: {
        orderByKey: true,
        startAt: lessonKey,
        limitToFirst: pageSize + 1
      }
    });
    return (
      this
        .findLessonsForLessonsKeys(lessonKeys$)
        .map(lessons => lessons.slice(1, lessons.length))
    );
  }

  loadPreviousPage(courseUrl: string, lessonKey: string, pageSize: number): Observable<Lesson[]> {
    const lessonKeys$ = this.findLessonKeysPerCourseUrl(courseUrl, {
      query: {
        orderByKey: true,
        endAt: lessonKey,
        limitToLast: pageSize + 1
      }
    });
    return (
      this
        .findLessonsForLessonsKeys(lessonKeys$)
        .map(lessons => lessons.slice(0, lessons.length - 1))
    );
  }
}
