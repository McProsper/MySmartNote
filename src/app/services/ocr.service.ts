import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { createWorker } from 'tesseract.js';

@Injectable({
  providedIn: 'root'
})
export class OcrService {

  private worker: any;

  constructor() {}

  async initWorker(lang: string = 'eng+fra') {
    this.worker = await createWorker(lang);
  }

  async recognizeText(imageDataUrl: string): Promise<string> {
    if (!this.worker) {
      await this.initWorker(); 
    }

    const {
      data: { text },
    } = await this.worker.recognize(imageDataUrl);

    return text;
  }

  async terminateWorker() {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }
}
