import { Component, OnInit, Inject } from '@angular/core';
import {DOCUMENT} from '@angular/common';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isDark = false;
  private static readonly DARK_THEME_DARK = 'dark-theme';
  private static readonly DARK_THEME_LIGHT = 'sigaa-spa-theme';


  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (this.isDark) {
      let element = this.document.getElementById('body');
      if(element)
        element.className = HeaderComponent.DARK_THEME_DARK;
    } else {
      let element  = this.document.getElementById('body');
      if(element)
        element.className = HeaderComponent.DARK_THEME_LIGHT;
    }
  }
}
