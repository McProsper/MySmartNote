import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton,
   IonIcon, IonItem, IonLabel, IonSelectOption, IonList, IonSelect, IonCard, IonCardHeader, IonCardTitle, 
   IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, IonText, IonSearchbar } from '@ionic/angular/standalone';

interface Document{
  title: string;
  subtitle: string;
  content: string;
  color: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonText, IonButtons, IonContent, IonHeader, IonTitle, IonItem, IonLabel, IonToolbar, IonSelectOption,
     IonButton, IonIcon, IonMenuButton, CommonModule, FormsModule, IonList, IonSelect, IonCard, IonCardHeader, 
     IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol]
})
export class HomePage implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  searchActive = false;
  searchTerm = '';
  selectedSort: string = 'dateDesc';
  uploadedDocuments: any[] = []; // tableau pour stocker les fichiers uploadés
  filteredUploadedDocuments: any[] = []; //tableau pour stocker les fichiers uploadés filtrés avec la recherche classique


  constructor(private router: Router) { }

  ngOnInit() {
  }

  documents: Document[] = [
    { title: 'Nsisse', subtitle: 'Prosper', content: 'Bref.....', color: 'primary' },
    { title: 'Lina', subtitle: 'Messia', content: 'Bref......', color: 'secondary' },
    { title: 'Makamae', subtitle: 'Yv', content: 'Bref......', color: 'tertiary' },
    { title: 'Grace', subtitle: 'Ntitambert', content: 'Bref...', color: 'success' },
    { title: 'Messia', subtitle: 'Jephtée', content: 'Bref...', color: 'warning' },
    { title: 'Paris', subtitle: 'Idf', content: 'Bref.....', color: 'danger' },
  ];

  filteredDocuments: Document[] = [...this.documents];

  toggleSearch() {
    this.searchActive = true;
  }

  cancelSearch() {
  this.searchActive = false;
  this.searchTerm = '';
  this.filterUploadedDocuments(); 
}


  filterDocuments() {
    const term = this.searchTerm.toLowerCase();
    this.filteredDocuments = this.documents.filter((doc) =>
      doc.title.toLowerCase().includes(term) ||
      doc.subtitle.toLowerCase().includes(term) ||
      doc.content.toLowerCase().includes(term)
    );
  }

  getRows(data: any[]): any[][] {
  const rows: any[][] = [];
  for (let i = 0; i < data.length; i += 2) {
    rows.push(data.slice(i, i + 2));
  }
  return rows;
}


  applySort(){}

  goToInfoPage(){
    this.router.navigate(['/info']);
  }

  triggerFileInput() {
  this.fileInput.nativeElement.click();
}


  handleFileInput(event: any) {
  const file = event.target.files[0];
  if (file) {
    const fileData = {
      name: file.name,
      date: new Date().toLocaleDateString(),
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type
    };

    this.uploadedDocuments.push(fileData);
    this.filterUploadedDocuments();
     this.fileInput.nativeElement.value = ''; 
  }
}

filterUploadedDocuments() {
  const term = this.searchTerm.toLowerCase();
  if (!term) {
    this.filteredUploadedDocuments = [...this.uploadedDocuments];
    return;
  }

  // Sinon → on filtre les documents
  this.filteredUploadedDocuments = this.uploadedDocuments.filter(doc =>
    doc.name.toLowerCase().includes(term)
  );
}


}