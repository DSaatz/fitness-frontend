import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  routerLink: string;
  dropdown?: DropdownItem[];
  isDropdownOpen?: boolean;
  closeTimeout?: any; // For debounced mouseleave
}
interface DropdownItem {
  label: string;
  routerLink: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen = false;
  navItems: NavItem[] = [
    {
        label: 'Nutrition',
        routerLink: '/nutrition', // This is just a link for the header
         dropdown: [
           { label: 'Calorie Calculator', routerLink: '/calories' },
          { label: 'Nutrition Tracking', routerLink: '/nutrition-tracking' },
         ],
    },
    {
      label: 'Workouts',
      routerLink: '/workouts',  // This is just a link for the header
      dropdown: [
        { label: 'Workout Editor', routerLink: '/workout-editor' },
        { label: 'Workout Tracking', routerLink: '/workout-tracking' },
      ],
    },
    {
      label: 'Journey',
      routerLink: '/progress',
    },
    {
      label: 'Blog',
      routerLink: '/blog',
    },
      {
        label: 'Account',
        routerLink: '/account', // This is just a link for the header
        dropdown: [
        { label: 'Profile', routerLink: '/profile' },
          { label: 'Settings', routerLink: '/settings' },
          { label: 'Logout', routerLink: '/logout' },
        ]
    }
  ];

  ngOnInit() {
    this.navItems.forEach(item => {
        if (item.dropdown) {
            item.isDropdownOpen = false;
        }
    });
}

    showDropdown(navItem: NavItem) {
        if (navItem.dropdown) {
            if (navItem.closeTimeout) {
                clearTimeout(navItem.closeTimeout); // Clear any scheduled close
                navItem.closeTimeout = null;
            }
          navItem.isDropdownOpen = true;
      }
    }

    hideDropdown(navItem: NavItem) {
        if (navItem.dropdown) {
            navItem.closeTimeout = setTimeout(() => {
              navItem.isDropdownOpen = false;
                navItem.closeTimeout = null;
          }, 150);  // Adjust this delay in milliseconds
      }
    }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}