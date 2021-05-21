import {Injectable, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Travel} from "../last-travels/last-travels.component";
import {first, map, single} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class LastTravelsService implements OnInit, OnChanges {

    constructor(private db: AngularFirestore) {
    }


    ngOnChanges(changes: SimpleChanges): void {
        console.log("ON CHANGES LAST TRAVELS SERVICE");
    }

    ngOnInit(): void {
        console.log("INIT LAST TRAVELS SERVICE");
    }


    // getAllTravels(): Observable<Travel[]> {
    //     return this.db.collection('travels').snapshotChanges()
    //         .pipe(
    //             map(snaps => this.convertSnaps<Travel>(snaps),
    //                 first())
    //         );
    // }
    //
    //
    // // Converte in oggetto con data e id
    // convertSnaps<T>(snaps: DocumentChangeAction<any>[]) {
    //     return snaps.map(snap => {
    //         return <T>{
    //             id: snap.payload.doc.id,
    //             ...snap.payload.doc.data()
    //         }
    //     })
    // }


}



