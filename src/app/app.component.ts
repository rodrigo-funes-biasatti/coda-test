import { Component } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Rodrigo Funes Biasatti - Test Coda';
  mode: ProgressSpinnerMode = 'indeterminate';
  showSpinner: boolean = false;
  value = 50;
  data?: any;

  constructor(public spinnerService: SpinnerService) { }
}
