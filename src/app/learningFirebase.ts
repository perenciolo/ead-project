// Learning Firebase

//   <button (click)="listPush()">List Push</button>
//   <button (click)="listRemove()">List Remove</button>
//   <button (click)="listUpdate()">List Update</button>
//   <button (click)="objUpdate()">Object Update</button>
//   <button (click)="objSet()">Object Set</button>
//   <button (click)="objRemove()">Object Remove</button>

//   app.component.ts >>

//   courses$: FirebaseListObservable<any>;
//   lessons$: FirebaseObjectObservable<any>;
//   firstCourse;

//   constructor(private db: AngularFireDatabase) {
//     this.courses$ = db.list('courses');

//     this.courses$.subscribe(val => console.log(val));

//     this.lessons$ = db.object('lessons/-Kn27YUFeUz-jmAlRVtb');

//     this.lessons$.subscribe(console.log);

//     this.courses$.map(courses => courses[0]).subscribe(course => this.firstCourse = course);
//   }

//   listPush() {
//     this.courses$.push({ description: 'TEST NEW COURSE!' }).then(() => console.log('List Push done!'), console.error);
//   }


//   listRemove() {
//     this.courses$.remove(this.firstCourse);
//   }

//   listUpdate() {
//     this.courses$.update(this.firstCourse, { description: "Meu pau te cutuca!" });
//   }

//   objUpdate() {
//     this.lessons$.update({ description: '2 NEW DESCRIPTION!' });
//   }

//   objSet() {
//     this.lessons$.set({ description: 'SET NEW DESCRIPTION!' });
//   }

//   objRemove() {
//     this.lessons$.remove();
//   }