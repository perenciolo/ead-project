import { Component } from '@angular/core';
import { initializeApp, database } from 'firebase';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works just fine!';

  courses$: FirebaseListObservable<any>;
  lessons$: FirebaseObjectObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.courses$ = db.list('courses');

    this.courses$.subscribe(val => console.log(val));

    this.lessons$ = db.object('lessons/-Kn27YUFeUz-jmAlRVtb');

    this.lessons$.subscribe(console.log);
  }

  listPush() {
    this.courses$.push({ description: 'TEST NEW COURSE!' }).then(console.error);
  }


}
