import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {Observable, Subject} from 'rxjs';
import {Note} from '../../../core/models/Note';
import {first, map} from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  /* In edit note html */
  inEditNote = new Subject<string>();

  /* In edit note ID */
  InEditNoteID: string | undefined;


  constructor(private db: AngularFirestore) {
    this.getLastNote().subscribe(note => {
      const {html, id} = note[0];
      this.inEditNote.next(html as string);
      this.InEditNoteID = id;
    });
  }

  /* Get all notes */
  getAllNotes(): Observable<Note[]> {
    return this.db.collection('notes', ref => ref.orderBy('date', 'desc'))
      .snapshotChanges().pipe(
        map(snaps => this.convertSnaps<Note>(snaps)),
        first()
      );
  }

  /* Get the last noteHtmlModel */
  getLastNote(): Observable<Note[]> {
    return this.db.collection('notes', ref => ref.orderBy('date', 'desc').limit(1))
      .snapshotChanges()
      .pipe(map(snaps => this.convertSnaps<Note>(snaps)));
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

  /* Update a noteHtmlModel by Id */
  updateNote(changedHtml: string | null): void {
    const note: Partial<Note> = {
      html: changedHtml,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      timer: '00:00:00'
    };
    this.db.doc(`notes/${this.InEditNoteID}`).update(note);
  }

  deleteNote(id: string): void {
    this.db.collection('notes').doc('notes/OZleLia8lTVu0wXa2I7i').delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }

  /* Take the first line of all notes */
  getAllNotesFirstLIne(): Observable<Note[]> {
    return this.getAllNotes().pipe(
      map(value => {
        value.forEach(note => {
          const rows = note.html?.split('<p>');
          rows?.forEach(row => row = row.replace(/(<([^>]+)>)/g, ''));
          note.html = rows?.filter(row => row !== '')[0] as string | null;
        });
        return value;
      })
    );
  }

}



