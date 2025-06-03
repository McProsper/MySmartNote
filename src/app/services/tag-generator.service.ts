import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagGeneratorService {

  constructor() {}

  generateTags(text: string, maxTags: number = 5): string[] {
    if (!text) return [];

    const stopWords = ['le', 'la', 'les', 'de', 'des', 'et', 'à', 'en', 'du', 'un', 'une', 'pour', 'avec', 'sur', 'dans', 'par', 'est', 'que', 'qui', 'ne', 'pas', 'au', 'aux'];
    const words = text
      .toLowerCase()
      .replace(/[.,;:!?()]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.includes(word));

    const frequencyMap: { [key: string]: number } = {};
    for (const word of words) {
      frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    }

    const sorted = Object.entries(frequencyMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, maxTags)
      .map(([word]) => word);

    return sorted;
  }
}
