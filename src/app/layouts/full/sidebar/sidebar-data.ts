import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Acervo',
  },
  {
    displayName: 'Pesquisar',
    iconName: 'search',
    route: '/home',
  },
  {
    displayName: 'Contribuir',
    iconName: 'layout-dashboard',
    route: '/home/new-contribution',
  },
  {
    displayName: 'Minhas contribuições',
    iconName: 'layout-dashboard',
    route: '/home/my-contributions',
  },
  {
    navCap: 'Perfil',
  },
  {
    displayName: 'Meu perfil',
    iconName: 'layout-dashboard',
    route: '/home/profile',
  }
];
