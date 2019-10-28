import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Diversidade-pcd';
  radioDecision1: any; // rspData = form
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  constructor(cdr: ChangeDetectorRef) {
    // super( http);
  }

  onPublishModeChanges($event) {
    console.log
    if($event) {
      this.radioDecision1.publishDate = true
    } else {
      this.radioDecision1.publishDate = false;
    }
  }
}
