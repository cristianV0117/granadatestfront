import { Routes } from '@angular/router';
import { CountryList } from './modules/countries/pages/country-list/country-list';
import { LogsList } from './modules/logs/pages/logs-list/logs-list';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'countries',
        pathMatch: 'full',
    },
    {
        path: 'countries',
        component: CountryList,
    },
    {
        path: 'logs',
        component: LogsList,
    },
];
