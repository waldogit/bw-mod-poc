import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bw-mod-client';
  convId: string;

  update(convId: string) {
    this.convId = convId;
  }
}
