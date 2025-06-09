import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon } from '@ionic/angular/standalone';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';



@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.page.html',
  styleUrls: ['./document-detail.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, CommonModule, FormsModule, NgxExtendedPdfViewerModule]
})



export class DocumentDetailPage implements OnInit {

  searchActive = false;
  searchTerm = '';
  documentName = '';
  documentContent = '';
  imageDataUrl = '';
  isPdf = false;
  pdfSrc = '';



  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.documentName = this.route.snapshot.queryParamMap.get('name') || '';
  this.documentContent = this.route.snapshot.queryParamMap.get('content') || '';
  this.imageDataUrl = this.route.snapshot.queryParamMap.get('imageDataUrl') || '';

  if (this.documentName.endsWith('.pdf')) {
    this.isPdf = true;
    this.pdfSrc = this.route.snapshot.queryParamMap.get('pdfSrc') || '';
  }

  }

  

}
