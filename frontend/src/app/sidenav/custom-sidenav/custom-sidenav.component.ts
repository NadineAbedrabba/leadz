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
  this.sideNavChanged();  // Déclenche la fonction lors du changement de 'collapsed'

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
  imgSize = computed( () => this.sidNavCollapsed() ? '55' : '130') ;

   //imgsrc = computed(() => this.sidNavCollapsed() ? 'assets/virgule.png' : 'assets/logo.png');
  logoSize = computed(() => this.sidNavCollapsed() ? '40' : '160');

  imgSrc: string = 'assets/logo.png';

  sideNavChanged() {
    const delay = this.sidNavCollapsed() ?  492 : 50;  // 600ms si 'collapsed', sinon 300ms

    setTimeout(() => {
      this.imgSrc = this.sidNavCollapsed() ? 'assets/icone.png' : 'assets/logo1.png';
    }, delay);
  }

}
