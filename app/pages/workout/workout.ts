import {Page} from 'ionic-framework/ionic';

import{CurrentWorkoutService} from '../../services/current_workout';


@Page({
  templateUrl: 'build/pages/workout/workout.html'
})
export class WorkoutPage {
    currentWorkout:CurrentWorkoutService;
    constructor(CurrentWorkout:CurrentWorkoutService) {
        this.currentWorkout = CurrentWorkout;
    }
}
