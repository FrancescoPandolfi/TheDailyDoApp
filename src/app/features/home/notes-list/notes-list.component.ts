import {Component, OnInit} from '@angular/core';
import {Note} from '../../../core/models/Note';
import {NotesStore} from '../store/notes.store';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  notes: Note[] | undefined;
  defaultTimestamp = new Timestamp(0, 0);

  constructor(public notesStore: NotesStore) {}

  ngOnInit(): void {
    this.notesStore.notes$.subscribe(n => this.notes = n);
  }

  selectThisNote(id: string | undefined): void {
    const noteToEdit = this.notes?.find(n => n.id === id);
    if (noteToEdit) {
      this.notesStore.inEditNote.next(noteToEdit);
    }
    this.notesStore.inEditNoteID = id;
  }

}
