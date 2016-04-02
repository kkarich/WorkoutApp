import {Page, Alert, NavController} from 'ionic-framework/ionic';

import {IWorkout, Workout} from "../../interfaces/workout"

import {CurrentWorkoutService} from '../../services/current_workout';
import {CurrentPlanService} from '../../services/current_plan';
import {LogService} from '../../services/log';
import {debounce} from '../../services/utility';


@Page({
    templateUrl: 'build/pages/workout/workout.html'
})
export class WorkoutPage {
    // init properties
    workout;
    plan: CurrentPlanService;
    log: LogService
    nav: NavController
    exerciseIsCompleted;

    constructor(nav: NavController, currentPlan: CurrentPlanService, currentWorkout: CurrentWorkoutService, log: LogService) {
        this.workout = currentWorkout;
        this.plan = currentPlan;
        this.log = log;
        this.nav = nav;

        this.exerciseIsCompleted = debounce((exercise) => {
            // if the exercise is completed, make sure to handle it
            if (exercise.isCompleted()) this.handleCompletedExercise(exercise);
        }, 1000, false);

    }

    // save the workout
    save(completed: boolean) {
        if (completed) this.workout.completed = completed;
        
        // save workout, then handle screen. Right now that is just popping off the top element
        this.workout.save().then((resp) => {
            this.nav.pop();
        });
    }

    // logic for when someone clicks on a rep
    handleRepClick(exerciseIndex, repIndex) {
        var exercise = this.workout.exercises[exerciseIndex];

        // 3 options. Either rep is null needs to be set to max, 0 needs to be set to null, or it can be decremented
        if (exercise.reps[repIndex] !== 0 && !exercise.reps[repIndex]) {
            exercise.reps[repIndex] = exercise.rep_goal;
        } else if (exercise.reps[repIndex] === 0) {
            exercise.reps[repIndex] = null;
        } else {
            exercise.reps[repIndex]--;
        };

        // check to see if exercise is completed
        this.exerciseIsCompleted(exercise);
    }

    // handles completed exercise. ie: markes as complete, calculates suggested weight, ...
    handleCompletedExercise(exercise) {
        console.log("COMPLETED")
        if (exercise.reachedGoal()) {
            exercise.suggested_weight = exercise.weight;
            exercise.message = 'Nice job! Suggested Weight:';

        } else {
            exercise.suggested_weight = exercise.weight;
            exercise.message = "Better luck next time. Suggested Weight:";

        }
    }

    // prompt to adjust weight for clicked exercise
    adjustWeightPrompt(exercise, property) {
        let prompt = Alert.create({
            title: 'Adjust Weight',
            message: "",
            inputs: [
                {
                    type: 'number',
                    name: 'weight',
                    value: exercise[property],
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Update',
                    handler: data => {
                        console.log('Saved clicked', data);
                        exercise[property] = data.weight;
                    }
                }
            ]
        });
        this.nav.present(prompt);
    }

    // prompt to change workout to different workout in plan
    changeWorkoutPrompt() {
        // Init prompt values
        let prompt = Alert.create({
            title: 'Change Workout',
            message: "",
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Update',
                    handler: data => {
                        this.changeWorkout(data)
                    }
                }
            ]
        });
        // add in the plans workout options
        // key the value as the index, used to get the workout
        for (var i in this.plan.workouts) {
            var workout = this.plan.workouts[i];
            prompt.addInput({
                type: 'radio',
                label: workout.name,
                value: i,
                checked: this.workout.index == workout.index
            });

        }

        // present alert to screen
        this.nav.present(prompt);
    }

    // get value from passed in select object
    changeWorkout(value) {
        if (value && value != this.workout.index) {
            // get workout by index and set it to current workout.
            // we need to parse int to ensure we are not initing it with a string
            this.plan.getWorkout(parseInt(value)).then(workout => {
                this.workout.set(new Workout(workout));
            })
        }
    }
}
