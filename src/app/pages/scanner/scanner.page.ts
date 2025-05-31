import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { OcrService } from '../../services/ocr.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonSpinner, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonButtons]
})
export class ScannerPage {

  scannedText: string = '';
  isLoading: boolean = false;

  constructor(private navCtrl: NavController, private ocrService: OcrService) { }

  async scanImage() {
    this.isLoading = true;
    this.scannedText = '';

    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      const text = await this.ocrService.recognizeText(image.dataUrl!);
      this.scannedText = text;

      this.navCtrl.navigateForward('/result', {
        state: {
          text,
          isNewScan: true  
        }
      });
    } catch (error) {
      console.error('Erreur OCR:', error);
      this.scannedText = 'Erreur lors du scan.';
    }

    this.isLoading = false;
  }
}
