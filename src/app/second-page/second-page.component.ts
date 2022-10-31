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

  currentToken: Token | null = null;
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
    this.userService.removeDiscountTokenStatus().subscribe((data) => {
      console.log('discount token invalidated');
      this.userRewarded = true;
      this.refreshTokenList();
    });
  }

  refreshTokenList() {
    this.userService.getDiscountTokens().subscribe((data) => {
      console.log('calling tokens service');
      if (data.DiscountToken.length !== 0) {
        console.log('got tokens response');
        this.currentToken = data.DiscountToken[0];
        console.log({ currentToken: this.currentToken });
        this.userService.getDiscountTokenStatus().subscribe((statusData) => {
          if (
            statusData.DiscountTokenStatus &&
            statusData.DiscountTokenStatus[0].status == 'Valid'
          ) {
            console.log('statis valid');
            this.tokenList = data.DiscountToken;
            this.userRewarded = false;
          } else this.tokenList = [];
        });
      }
    });
  }
}
