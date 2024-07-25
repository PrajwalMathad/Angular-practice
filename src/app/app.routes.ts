import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { NoRouteComponent } from './components/no-route/no-route.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        title: "Home Page"
    },
    {
        path: "details/:id",
        component: DetailsComponent,
        title: "Details page"
    },
    {
        path: "practice",
        loadComponent: () => import('./components/practice/practice.component').then(m => m.PracticeComponent), 
        title: "Practice page"
    },
    {
        path: "**",
        component: NoRouteComponent,
        title: "Practice page"
    }
];
