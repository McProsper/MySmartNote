import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import {IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonMenu, IonMenuToggle, IonItem, IonLabel } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [RouterModule, IonContent, IonApp, IonRouterOutlet, IonButtons, IonContent, IonHeader,
     IonTitle, IonMenuToggle, IonItem, IonLabel, IonToolbar,  IonMenuButton, IonMenu],

})
export class AppComponent {
  constructor() {}
}
