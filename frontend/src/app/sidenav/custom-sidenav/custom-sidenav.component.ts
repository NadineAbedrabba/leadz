import { Component, computed, Input, signal } from '@angular/core';
import { MenuItemType } from '../types/menu-item-type';
import{MatListModule} from '@angular/material/list'
import { CommonModule } from '@angular/common';
import{ MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  templateUrl: './custom-sidenav.component.html',
  styleUrls: ['./custom-sidenav.component.scss'],
  imports: [CommonModule, MatListModule,MatIconModule,RouterModule]
})
export class CustomSidenavComponent {
sidNavCollapsed=signal(false) ;
@Input()  set collapsed(val : boolean) {
  this.sidNavCollapsed.set(val);
} ;

  menuItems= signal<MenuItemType[]>( [
    {
      icon: 'contacts',
      label : 'Contacts',
      route:'contacts',
    },
    {
      icon: 'folder_shared_icon',
      label : 'Documents',
      route:'documents',
    },
    {
      icon: 'dashboard',
      label : 'Dashboard',
      route:'dashboard',
    },
    {
      icon: 'logout',
      label : 'Se déconnecter',
      route:'auth',
    }
  ] );

  imgSize = computed( () => this.sidNavCollapsed() ? '0.28' : '0.75') ;

}
