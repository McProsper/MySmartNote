import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummarizerService {
  private apiUrl = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
  private apiToken = 'Bearer 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';

  constructor(private http: HttpClient) { }

  summarize(text: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.apiToken,
      'Content-Type': 'application/json'
    });

    const body = {
      inputs: text
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
