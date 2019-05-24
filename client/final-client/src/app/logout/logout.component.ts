import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  user;
  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
  }
  Logout(){
    localStorage.clear();
    this.router.navigate([''])
    console.log('test')
  }
}
