import {Component, OnInit} from '@angular/core';
import {Blur, ContentChange, Focus} from 'ngx-quill';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;
import {Note} from '../../../core/models/Note';
import {NotesStore} from '../store/notes.store';
import {FormControl, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  date: Timestamp | undefined;
  isEditorFocused = false;
  notes: Note[] | undefined;
  noteHtmlModel = '';
  noteModelCopy = '';
  noteTitleCopy = '';
  titleInput: FormControl = new FormControl();

  constructor(public notesStore: NotesStore) {
  }

  ngOnInit(): void {
    this.notesStore.inEditNote.subscribe(note => {
      this.noteHtmlModel = note.html as string;
      this.noteModelCopy = note.html as string;
      this.noteTitleCopy = note.title as string;
      this.titleInput.setValue(note.title);
    });
    this.notesStore.notes$.subscribe(c => this.notes = c);

    this.titleInput = new FormControl('', Validators.maxLength(60));
    this.updateTitleWhenValueChanges();
  }

  updateTitleWhenValueChanges(): void {
    this.titleInput.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(title => {
      if (this.noteTitleCopy !== title) {
        this.notesStore.updateNote(this.noteHtmlModel, title);
      }
    });
  }

  contentChanged(EditorContentChange: ContentChange): void {
    if (this.noteModelCopy !== EditorContentChange.html && this.isEditorFocused) {
      this.notesStore.updateNote(EditorContentChange.html, this.titleInput.value);
    }
  }

  onFocus($event: Focus): void {
    this.isEditorFocused = true;
  }

  onBlur($event: Blur): void {
    this.isEditorFocused = false;
  }

}
