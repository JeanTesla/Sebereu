import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SearchDataComponent } from './search/search-data.component';
import { NewContributionComponent } from './new-contribution/new-contribution.component';
import { MyContributionsComponent } from './my-contributions/my-contributions.component';


export const PagesRoutes: Routes = [
  {
    path: '',
    component: SearchDataComponent,
    data: {
      title: 'search-data',
    }
  },
  {
    path: 'new-contribution',
    component: NewContributionComponent,
    data: {
      title: 'new-contribution',
    }
  },
  {
    path: 'my-contributions',
    component: MyContributionsComponent,
    data: {
      title: 'my-contributions',
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'Profile',
    }
  }
];
