import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'scanner',
    loadComponent: () => import('./pages/scanner/scanner.page').then( m => m.ScannerPage)
  },
  {
    path: 'result',
    loadComponent: () => import('./pages/result/result.page').then( m => m.ResultPage)
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'info',
    loadComponent: () => import('./pages/info/info.page').then( m => m.InfoPage)
  },
  {
    path: 'document-detail',
    loadComponent: () => import('./pages/document-detail/document-detail.page').then( m => m.DocumentDetailPage)
  },


];
