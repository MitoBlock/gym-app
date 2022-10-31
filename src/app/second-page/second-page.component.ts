import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Balance } from '../models/balance';
import { Token } from '../models/reward-token';
import { User } from '../models/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss'],
})
export class SecondPageComponent implements OnInit {
  balance: Balance = { denom: 'mitocell', amount: '0' };
  user: User = new User(
    'Bob',
    'mito1ssl9xlelyk0u93w5x50snxwslcspfq4pdurj34',
    this.balance,
  );

  currentToken?: Token 
  membershipClaimed = false;
  showTimer = false;
  counter = 5;
  score = 0;
  userRewarded = false;
  tokenList: Token[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.refreshTokenList();
  }

  // handle discount for 5% off
  handleUseDiscount() {
    console.log('handle use discount');
    this.userService.removeMembershipTokenStatus().subscribe((data) => {
      console.log('membership token invalidated');
      this.userRewarded = true;
      this.refreshTokenList();
    });
  }

  refreshTokenList() {
    this.userService.getMembershipTokens().subscribe((data) => {
      console.log('calling tokens service');
      console.log( { data })
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
            console.log( { statusData })
            this.tokenList = data.MembershipToken;
            this.userRewarded = false;
          } else this.tokenList = [];
        });
      }
    });
  }
}
