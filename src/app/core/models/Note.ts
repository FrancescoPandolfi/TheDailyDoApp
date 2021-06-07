import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Note {
  id?: string;
  html: string | null;
  date: Timestamp;
  timer: string;
}
