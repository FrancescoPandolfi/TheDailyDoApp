import {Component, OnInit} from '@angular/core';
import {Blur, ContentChange, EditorChangeContent, EditorChangeSelection, Focus} from 'ngx-quill';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import {NotesService} from '../services/notes.service';
import {Note} from '../../../core/models/Note';
import {NotesStore} from '../store/notes.store';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit{
  date: Timestamp | undefined;
  isEditorFocused = false;
  notes: Note[] | undefined;
  noteHtmlModel = '';
  noteModelCopy = '';

  constructor(
    public NoteSrv: NotesService,
    public notesStore: NotesStore
  ) {
    this.NoteSrv.inEditNote.subscribe(res => {
      this.noteHtmlModel = res;
      this.noteModelCopy = res;
    });
  }

  contentChanged(EditorContentChange: ContentChange): void {
    if (this.noteModelCopy !== EditorContentChange.html && this.isEditorFocused) {
      this.NoteSrv.updateNote(EditorContentChange.html);
    }
  }

  onFocus($event: Focus): void {
    this.isEditorFocused = true;
  }

  onBlur($event: Blur): void {
    this.isEditorFocused = false;
  }

  ngOnInit(): void {
    this.notesStore.notes$.subscribe(c => this.notes = c);
  }

}
