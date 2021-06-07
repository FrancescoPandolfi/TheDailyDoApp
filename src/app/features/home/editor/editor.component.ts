import {Component, OnInit} from '@angular/core';
import {ContentChange} from 'ngx-quill';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import {Note} from '../../../core/models/Note';
import {NotesListService} from '../services/notes-list.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  date: Timestamp | undefined;

  constructor(
    private db: AngularFirestore,
    public NoteSrv: NotesListService
  ) {
  }

  ngOnInit(): void {
  }

  contentChanged(contentChange: ContentChange): void {
    // console.log(contentChange);

    const note: Note = {
      html: contentChange.html,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      timer: '00:00:00'
    };

    this.NoteSrv.updateNote();
  }




}
