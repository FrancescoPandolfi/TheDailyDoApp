import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Note} from '../../../core/models/Note';
import {first, map, tap} from 'rxjs/operators';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class NotesStore {

  /* Notes state */
  notesBehaviorSubject: BehaviorSubject<Note[]> = new BehaviorSubject([{}] as Note[]);
  public readonly notes$: Observable<Note[]> = this.notesBehaviorSubject.asObservable();

  /* In edit note ID */
  inEditNoteID: string | undefined;

  /* In edit note html */
  inEditNote = new Subject<Note>();

  constructor(private db: AngularFirestore) {
  }

  setNoteOnComponentInit(): void {
    this.getAllNotes().subscribe(note => {
      this.inEditNote.next(note[0]);
      this.inEditNoteID = note[0].id;
    });
  }

  /* Create new note */
  createNote(note: Note): void {
    this.db.collection('notes')
      .add(note)
      .then(res => {
          /* create in local state */
          note.id = res.id;
          const notes = this.notesBehaviorSubject.value;
          notes.unshift(note);
          this.inEditNoteID = res.id;
          this.notesBehaviorSubject.next(notes);
          this.inEditNote.next(note);
        }
      );
  }

  /* Update a noteHtmlModel by Id */
  updateNote(changedHtml: string | null, changedTitle: string | null): void {
    /* Update local state */
    const dateNow = firebase.firestore.Timestamp.fromDate(new Date());
    const note: Partial<Note> = {
      html: changedHtml,
      title: changedTitle,
      date: dateNow,
      timer: '00:00:00'
    };
    /* Update db */
    this.db.doc(`notes/${this.inEditNoteID}`).update(note).then(() => {
      const noteState = this.notesBehaviorSubject.value;
      let indexToPutFirst = 0;
      noteState.map((n, i) => {
        if (n.id === this.inEditNoteID) {
          n.html = changedHtml;
          n.date = dateNow;
          n.title = changedTitle;
          indexToPutFirst = i;
        }
      });
      /* Put to 1st place the modified note */
      const noteToPutFirst = noteState.splice(indexToPutFirst, 1)[0];
      noteState.unshift(noteToPutFirst);
    });
  }

  deleteNote(): Promise<void> {
    return this.db.collection('notes').doc(`${this.inEditNoteID}`).delete().then(() => {
      console.log('Document successfully deleted!');
      const newNoteState = this.notesBehaviorSubject.value.filter(note => note.id !== this.inEditNoteID);
      this.notesBehaviorSubject.next(newNoteState);
      this.inEditNoteID = newNoteState[0].id;
      this.inEditNote.next(newNoteState[0]);
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
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

  /* Get all notes */
  private getAllNotes(): Observable<Note[]> {
    return this.db.collection('notes', ref => ref.orderBy('date', 'desc'))
      .snapshotChanges().pipe(
        map(snaps => this.convertSnaps<Note>(snaps)),
        tap(notes => this.notesBehaviorSubject.next(notes)),
        first()
      );
  }


  /* Extract the first line of the note HTML */
  // private extractFirstLine(note: Partial<Note>): string | null {
  //   const rows = note.html?.split('<p>');
  //   rows?.forEach(row => row = row.replace(/(<([^>]+)>)/g, ''));
  //   return rows?.filter(row => row !== '')[0] as string | null;
  // }


}



