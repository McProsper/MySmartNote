import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { createWorker } from 'tesseract.js';

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  // Instance du worker Tesseract
  private worker: any;

  constructor() { }

  /**
   * Initialise le worker Tesseract avec les langues spécifiées.
   * @param lang Langues à utiliser pour la reconnaissance (par défaut 'eng+fra').
   */
  async initWorker(lang: string = 'eng+fra') {
    this.worker = await createWorker(lang);
  }


  /**
   * Reconnaît le texte à partir d'une image donnée en URL de données.
   * @param imageDataUrl URL de données de l'image à traiter.
   * @returns Texte reconnu.
   */
  async recognizeText(imageDataUrl: string): Promise<string> {
    // Initialise le worker si nécessaire
    if (!this.worker) {
      await this.initWorker();
    }

    // Reconnaissance du texte dans l'image
    const {
      data: { text },
    } = await this.worker.recognize(imageDataUrl);
    return text;
  }


  /**
   * Libère les ressources du worker
   */
  async terminateWorker() {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }
}
