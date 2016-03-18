export interface IExercise {
    id?: number;
    exercise_id: string;
    name: string;
    rep_goal: number;
    set_goal: number;
    weight?: number;
    reps?: Array<number>;
}

export class Exercise implements IExercise {
    id;
    exercise_id;
    name;
    rep_goal;
    set_goal;
    weight;
    reps;
    constructor({exercise_id, name, rep_goal, set_goal, reps, weight}: IExercise) {
        // init properties
        this.name = name;
        this.exercise_id = exercise_id;
        this.rep_goal = rep_goal;
        this.set_goal = set_goal;

        // default reps array
        this.reps = reps || initArray(set_goal);

        // TODO: Get suggested weight from previous workout
        // define weight
        this.weight = weight || null;
    }

    // check to see if all of the reps have been completed
    isCompleted() {
        // check each rep to make sure it is not null 
        for (var i in this.reps) {
            var rep = this.reps[i];
            // if rep is null return false
            if (!rep && rep !== 0) {
                return false
            }
        }
        return true
    }

    // check to see if the gaol was reached
    reachedGoal() {
        // check each rep to make sure it is not null 
        for (var i in this.reps) {
            var rep = this.reps[i];
            // if rep is null return false
            if (!rep || rep < this.rep_goal) {
                return false;
            }
        }
        return true;
    }




}

// init array should init an array with length 'length' initialized with null values
function initArray(length) {
    var array = [];
    for (var i = 0; i < length; i++) {
        array.push(null)
    }
    return array;
}
