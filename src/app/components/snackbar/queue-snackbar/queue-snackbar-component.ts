import { Component } from '@angular/core';

/** Component opened inside a snackbar. */
@Component({
  selector: 'countdown-snackbar',
  templateUrl: 'queue-snackbar.component.html',
})
export class QueueSnackbarComponent {
  currentTime = 60;
}
