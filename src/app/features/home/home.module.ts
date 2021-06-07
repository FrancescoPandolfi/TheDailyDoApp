import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {SharedModule} from '../../shared/shared.module';
import {NotesListComponent} from './notes-list/notes-list.component';
import {AngularSplitModule} from 'angular-split';
import {EditorComponent} from './editor/editor.component';
import {QuillModule} from 'ngx-quill';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [HomeComponent, NotesListComponent, EditorComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    AngularSplitModule,
    QuillModule,
    MatToolbarModule,
    FontAwesomeModule
  ]
})
export class HomeModule {
}
