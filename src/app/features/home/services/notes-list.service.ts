import {Injectable, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Note} from '../../../core/models/Note';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesListService {

  // In modification note html
  noteInEdit: string | null = '';

  // In modification note ID
  noteInEditID: string | undefined;



  constructor(private db: AngularFirestore) {
    this.getLastNote().subscribe(note => {
      const {html, id} = note[0];
      this.noteInEdit = html;
      this.noteInEditID = id;
    });
  }

  getAllNotes(): Observable<Note[]> {
    return this.db.collection('notes', ref => ref.orderBy('date', 'desc'))
      .snapshotChanges()
      .pipe(map(snaps => this.convertSnaps<Note>(snaps)));
  }

  getLastNote(): Observable<Note[]> {
    return this.db.collection('notes', ref => ref.orderBy('date', 'desc').limit(1))
      .snapshotChanges()
      .pipe(map(snaps => this.convertSnaps<Note>(snaps)));
  }

  // Converte in oggetto con data e id
  convertSnaps<T>(snaps: DocumentChangeAction<unknown>[]): T[] {
    return snaps.map(snap => {
      return {
        id: snap.payload.doc.id,
        // @ts-ignore
        ...snap.payload.doc.data()
      };
    });
  }

  updateNote(): void {
    const note: Partial<Note> = {html: this.noteInEdit};
    this.db.doc(`notes/${this.noteInEditID}`).update(note);
  }

  deleteNote(id: string): void {
    this.db.collection('notes').doc('notes/OZleLia8lTVu0wXa2I7i').delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }


}



