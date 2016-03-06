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
