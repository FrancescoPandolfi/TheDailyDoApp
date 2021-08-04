import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export interface Note {
  id?: string;
  html: string | null;
  title: string | null;
  date: Timestamp;
  timer?: string;
}
