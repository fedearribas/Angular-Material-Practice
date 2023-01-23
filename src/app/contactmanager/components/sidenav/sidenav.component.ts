import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  isScreenSmall: boolean = false;
  users!: Observable<User[]>;
  isDarkTheme = false;

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router) {}

    @ViewChild(MatSidenav) sidenav!: MatSidenav;

    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    }

  ngOnInit() {
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isScreenSmall = true;
        } else {
          this.isScreenSmall = false;
        }
      });

      this.users = this.userService.getUsers();
      
      this.router.events.subscribe({
        next: () => {
          if (this.isScreenSmall) {
            this.sidenav.close();
          }
        }
      });
  }

  ngOnDestroy(): void {}

}
