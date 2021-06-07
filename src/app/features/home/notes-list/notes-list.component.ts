import {Component, OnInit} from '@angular/core';
import {NotesListService} from '../services/notes-list.service';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import {Observable} from 'rxjs';
import {Note} from '../../../core/models/Note';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  notes$: Observable<Note[]> | undefined;
  notes: Note[] = [];

  constructor(private srv: NotesListService) {
  }

  ngOnInit(): void {
    // this.notes$ = this.srv.getAllNotes();

    this.srv.getAllNotes().subscribe(res => {
      this.notes = res;
      this.notes.forEach(note => {
        const rows = note.html?.split('<p>');
        rows?.forEach(row => {
          row = row.replace(/(<([^>]+)>)/g, '');
        });
        note.html = rows?.filter(row => row !== '')[0] as string | null;
      });
    });
  }


  selectThisNote(note: Note): void {
    this.srv.noteInEdit = note.html;
    this.srv.noteInEditID = note.id;
  }



}
