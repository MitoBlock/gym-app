import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RewardToken } from '../models/reward-token';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-final-page',
  templateUrl: './final-page.component.html',
  styleUrls: ['./final-page.component.scss'],
})
export class FinalPageComponent implements OnInit {
  name = '';
  accountAddress = 'mito44';
  rewardTokens: RewardToken[] = [];
  accountId = -1;
  id = -1;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleUsePoints() {
    console.log('using points');
    // Swal.fire("Reward Redeemed", "Have fun cooking!");
    /*
    for (let token of this.rewardTokens) {
      if (token.activityName == 'Weekly Score') {
        //   "Discount") {
        let currentPoints = token.reward.value;
        if (currentPoints == 5) {
          this.userService.removeToken(token).subscribe((account) => {
            this.rewardTokens = account.rewardTokens;
          });
        } else {
          this.userService.reduceTokenPoints(token).subscribe((account) => {
            this.rewardTokens = account.rewardTokens;
          });
        }
      return
      }
    } */
  }

  handleUseDiscount() {
    // Swal.fire("Reward Redeemed", "Enjoy your class!");
    /*
    for (let token of this.rewardTokens) {
      if (token.activityName == 'Learn to make tacos') {
        //   "Discount") {
        // send request to delete token and update the list
        this.userService.removeToken(token).subscribe((account) => {
          this.rewardTokens = account.rewardTokens;
        });
      }
    }
  }

  handleMainSubmit(info: any) {
    this.router.navigate(['/user', this.id, 'offers']);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUser(this.id).subscribe((user: User) => {
      this.name = user.name;
      this.accountAddress = user.account?.publicAddress ?? '';
      this.accountId = user.account?.id ?? -1;
      this.rewardTokens = user.account?.rewardTokens ?? [];
    });
  } */
  }

  ngOnInit(): void {}
}
