import { Component } from '@angular/core';

export interface PeriodicElement {
  name: string;
  tags: String[];
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', tags: ["Forró", "mambo", "arranjo"], weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', tags: ["Forró", "mambo", "arranjo"], weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', tags: ["Forró", "mambo", "arranjo"], weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', tags: ["Forró", "mambo", "arranjo"], weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', tags: ["Forró", "mambo", "arranjo"], weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', tags: ["Forró", "mambo", "arranjo"], weight: 12.0107, symbol: 'C' },
];

@Component({
  selector: 'app-my-contributions',
  templateUrl: './my-contributions.component.html',
  styleUrls: ['./my-contributions.component.css']
})
export class MyContributionsComponent {
  displayedColumns: string[] = ['contribution', 'upload', 'downloads', 'tags'];
  dataSource = ELEMENT_DATA;
}
