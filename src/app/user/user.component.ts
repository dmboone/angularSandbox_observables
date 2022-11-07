import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  onActivate(){
    // this.userService.activatedEmitter.emit(true); // better to use a Subject here instead of Event Emitter!

    this.userService.activatedEmitter.next(true); // would use .next instead since we use a Subject this time instead of event emitter
                                                  // Subjects can have .next() called on them from the outside unlike Observables, which can only have that done from the inside of the observable
                                                  // We can also use operators on Subjects so they can be used in more active scenarios
                                                  // while Observables are better for passive scenarios
  }
}
