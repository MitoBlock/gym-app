import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  userName: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onUserAdd() {
    console.log({ uname: this.userName })
    if (this.userName.length > 0) {
      this.router.navigate(['/user']);
    } else {
      alert('Please enter the name');
    }
  }
}
