import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/table', title: 'Table List', icon: 'nc-tile-56', class: '' },
    { path: '/user', title: 'Seu perfil', icon: 'nc-single-02', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public sideBarTitle = "Sebereu";
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
