import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contactmanager-app',
  template: `
      <app-sidenav></app-sidenav>
  `,
  styles: [
  ]
})
export class ContactmanagerAppComponent {

  constructor(private iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const safeUrl = sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg');
    iconRegistry.addSvgIconSet(safeUrl);
  }

}
