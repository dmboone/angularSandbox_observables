import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService{
    // activatedEmitter = new EventEmitter<boolean>();
    activatedEmitter = new Subject<boolean>(); // better practice to use a subject for active data scenarios because you 
                                               // can both access it from the outside and use operators on it!
                                               // ** Only use Subjects to communicate across components through services (if you are using
                                               // subscribe this is likely the case); if you are not subscribing and are using @Output,
                                               // then use Event Emitter, NOT Subject **
}