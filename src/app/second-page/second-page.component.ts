import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Token } from '../models/types';
import { User } from '../models/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss'],
})
export class SecondPageComponent implements OnInit {
  user: User = new User('Bob', 'loading...');

  currentToken?: Token;
  membershipClaimed = false;
  showTimer = false;
  counter = 5;
  score = '0';
  userRewarded = false;
  tokenList: Token[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.refreshTokenList();
    this.userService.getUserAddress().subscribe((address) => {
      this.user.address = address;
    });
  }

  fixDate(date: string) {
    var dateArr = date.split(' ');
    let formattedDate = `${dateArr[1]} ${dateArr[2]} ${dateArr[3]}`;
    return formattedDate;
  }
  getCurrDate() {
    let currDate = new Date();
    return this.fixDate(currDate.toString());
  }
  getExpDate() {
    let expDate = new Date();
    expDate.setMonth(expDate.getMonth() + 1);
    return this.fixDate(expDate.toString());
  }
  // handle discount for 5% off
  handleUseDiscount() {
    console.log('handle use discount');
    this.userService
      .removeMembershipTokenStatus({
        token_id: 0,
        id: 0,
        timestamp: this.getCurrDate(),
      })
      .subscribe((data) => {
        console.log('membership token invalidated');
        this.userRewarded = true;
        this.refreshTokenList();
      });
  }

  refreshTokenList() {
    this.userService.getMembershipTokens().subscribe((data) => {
      console.log('calling tokens service');
      console.log({ data });
      if (data.MembershipToken.length !== 0) {
        console.log('got tokens response');
        this.currentToken = data.MembershipToken[0];
        console.log({ currentToken: this.currentToken });
        this.userService.getMembershipTokenStatus().subscribe((statusData) => {
          if (
            statusData.MembershipTokenStatus &&
            statusData.MembershipTokenStatus[0].status == 'Valid'
          ) {
            console.log('statis valid');
            console.log({ statusData });
            this.tokenList = data.MembershipToken;
            this.userRewarded = false;
          } else this.tokenList = [];
        });
      }
    });
  }
}
