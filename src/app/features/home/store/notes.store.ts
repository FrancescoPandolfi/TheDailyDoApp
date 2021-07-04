import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Note} from '../../../core/models/Note';
import {first, map, tap} from 'rxjs/operators';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotesStore {

  notesBehaviorSubject: BehaviorSubject<Note[]> = new BehaviorSubject([{}] as Note[]);
  public readonly notes$: Observable<Note[]> = this.notesBehaviorSubject.asObservable();

  constructor(private db: AngularFirestore) {
    this.getAllNotes().subscribe();
  }


  /* Get all notes */
  private getAllNotes(): Observable<Note[]> {
    return this.db.collection('notes', ref => ref.orderBy('date', 'desc'))
      .snapshotChanges().pipe(
        map(snaps => this.convertSnaps<Note>(snaps)),
        /* Take the first line of all notes */
        map(value => {
          value.forEach(note => {
            const rows = note.html?.split('<p>');
            rows?.forEach(row => row = row.replace(/(<([^>]+)>)/g, ''));
            note.firstLine = rows?.filter(row => row !== '')[0] as string | null;
          });
          return value;
        }),
        tap(notes => this.notesBehaviorSubject.next(notes)),
        first()
      );
  }

  /* Convert to object with data and id */
  convertSnaps<T>(snaps: DocumentChangeAction<unknown>[]): T[] {
    return snaps.map(snap => {
      return {
        id: snap.payload.doc.id,
        // @ts-ignore
        ...snap.payload.doc.data()
      };
    });
  }





}



