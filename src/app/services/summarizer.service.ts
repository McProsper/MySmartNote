import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummarizerService {
  // URL de l'API Hugging Face utilisant le modèle BART-large-CNN de Facebook
  private apiUrl = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
  // Token d'authentification pour l'API Hugging Face
  private apiToken = 'Bearer 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';

  constructor(private http: HttpClient) { }

  /**
 * Génère un résumé à partir d'un texte donné
 * @param text Le texte à résumer
 * @returns Un Observable contenant le résumé généré
 */
  summarize(text: string): Observable<any> {
    // Configuration des en-têtes HTTP avec le token d'authentification
    const headers = new HttpHeaders({
      Authorization: this.apiToken,
      'Content-Type': 'application/json'
    });

    // Corps de la requête contenant le texte à résumer
    const body = {
      inputs: text
    };

    // Envoi de la requête POST à l'API et retour de l'Observable
    return this.http.post(this.apiUrl, body, { headers });
  }
}
