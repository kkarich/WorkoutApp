import {Page} from 'ionic-framework/ionic';

import{CurrentWorkoutService} from '../../services/current_workout';
import{LogService} from '../../services/log';


@Page({
  templateUrl: 'build/pages/workout/workout.html'
})
export class WorkoutPage {
    workout;
    log:LogService
    constructor(currentWorkout:CurrentWorkoutService,log:LogService) {
        this.workout = currentWorkout;
        this.log = log;
    }
    save(){
        // pass in this workout to log save method
        this.log.logWorkout(this.workout, true);
    }
    handleRepClick(exerciseIndex,repIndex){
        var exercise = this.workout.exercises[exerciseIndex];
        if(!exercise.reps[repIndex]){
            exercise.reps[repIndex] = exercise.rep_goal;
        }else if(exercise.reps[repIndex] === 0){
            exercise.reps[repIndex] = null;
        }else{
            exercise.reps[repIndex]--;
        };
    }
}
