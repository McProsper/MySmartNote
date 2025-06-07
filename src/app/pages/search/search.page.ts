import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SearchPage implements OnInit {
  contentRef!: ElementRef;

  searchTerm = ''; /* Le mot saisi par l'utilisateur */
  rawText = ''; /* Contenu du document */
  documentHtml = ''; /* variable pour mots surlignés */
  matches: HTMLElement[] = [];
  currentIndex = 0;

  constructor() { }

  ngOnInit() {

    /* C'est juste pour simuler, on pourra remplacer par un truc recuperé dynamiquement */
    this.rawText = 'Nous devons etre capable de fournir une application mobile capble de scanner du texte, implémenter la fonction de recherche, faire une dictée vocale et ainsi de suite'
    this.documentHtml = this.rawText;

  }

  search(){
    
    if (!this.searchTerm.trim()) {
      return;
    }

  const regex = new RegExp(`(${this.escapeRegex(this.searchTerm)})`, 'gi');
  this.documentHtml = this.rawText.replace(regex, '<mark>$1</mark>');;

  setTimeout(() => {
    this.matches = Array.from(
      this.contentRef.nativeElement.querySelectorAll('mark')
    );
    this.currentIndex = 0;
    this.scrollToMatch();
  }, 0);
}


escapeRegex(text: string): string {
  return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

scrollToMatch() {
  if (this.matches.length === 0) return;

  this.matches.forEach((el) => el.classList.remove('current'));
  const currentEl = this.matches[this.currentIndex];
  currentEl.classList.add('current');
  currentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

nextMatch() {
  if (this.matches.length === 0) return;
  this.currentIndex = (this.currentIndex + 1) % this.matches.length;
  this.scrollToMatch();
}

prevMatch() {
  if (this.matches.length === 0) return;
  this.currentIndex =
    (this.currentIndex - 1 + this.matches.length) % this.matches.length;
  this.scrollToMatch();
}

clearHighlights() {
  this.documentHtml = this.rawText;
  this.matches = [];
  this.currentIndex = 0;
}


}
