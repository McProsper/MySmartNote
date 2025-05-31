import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonButton, IonSpinner } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SummarizerService } from '../../services/summarizer.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonButton, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ResultPage implements OnInit {
  scannedText = '';
  summary = '';
  loading = false;
  isNewScan = false; 

  constructor(private router: Router, private summarizer: SummarizerService) {
    const nav = this.router.getCurrentNavigation();
    this.scannedText = nav?.extras?.state?.['text'] || 'Aucun texte reconnu.';
  }

  async ngOnInit() { 
    if (this.isNewScan && this.scannedText && this.scannedText !== 'Aucun texte reconnu.') {
      await this.generateSummary();
    }
  }

  generateSummary() {
    this.loading = true;
    this.summarizer.summarize(this.scannedText).subscribe({
      next: (result: any) => {
        this.summary = result[0]?.summary_text || 'Résumé non disponible.';
        this.loading = false;
      },
      error: (e: any) => {
        this.summary = 'Erreur lors de la génération du résumé.';
        console.error(e);
        this.loading = false;
      }
    });
  }
}
