import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  , OnDestroy {

  isAuthenticated = false;

private userSub:Subscription

  constructor(private dataService: DataStorageService , private authService:AuthService) { }

  onSaveData() {
    this.dataService.storeRecipes();
  }

  onFetchData() {
    this.dataService.fetchRecipes().subscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
   });
  }

ngOnDestroy(): void {
  this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();

  }
}
