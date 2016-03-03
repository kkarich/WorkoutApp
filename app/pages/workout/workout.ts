import {Page} from 'ionic-framework/ionic';

import{CurrentWorkoutService} from '../../services/current_workout';


@Page({
  templateUrl: 'build/pages/workout/workout.html'
})
export class WorkoutPage {
    workout:CurrentWorkoutService;
    constructor(currentWorkout:CurrentWorkoutService) {
        this.workout = currentWorkout;
    }
}
