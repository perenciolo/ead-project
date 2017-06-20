import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Lesson } from './lesson';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class LessonsService {

  constructor(private db: AngularFireDatabase) { }

  findAllLessons(): Observable<Lesson[]> {
    return (
      this.db
        .list('lessons')
        .do(console.log)
        .map(Lesson.fromJSONList)
    );
  }
}
