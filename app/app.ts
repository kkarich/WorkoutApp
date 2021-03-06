import {App, IonicApp, Platform} from 'ionic-framework/ionic';

// Import my pages
import {HomePage} from './pages/home/home';
import {WorkoutPage} from './pages/workout/workout';

// Import My Services
import {LogService} from './services/log';
import {CurrentPlanService} from './services/current_plan';
import {CurrentWorkoutService} from './services/current_workout';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';

@App({
    templateUrl: 'build/app.html',
    providers: [LogService, CurrentPlanService, CurrentWorkoutService],
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
    rootPage: Type = HomePage;
    pages: Array<{ title: string, component: Type }>
    currentWorkout: CurrentWorkoutService;
    constructor(private app: IonicApp, private platform: Platform, currentWorkout: CurrentWorkoutService) {
        this.initializeApp();

        this.currentWorkout = currentWorkout;
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Getting Started', component: HomePage },
            { title: 'WorkoutPage', component: WorkoutPage }
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {

            this.currentWorkout.init();
            
            // add pause event listener
            // currently we are only saving the current workout
            document.addEventListener("pause", () => {
                // save the current workout 
                this.currentWorkout.save();
                
            }, false);
            
            // The platform is now ready. Note: if this callback fails to fire, follow
            // the Troubleshooting guide for a number of possible solutions:
            //
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //
            // First, let's hide the keyboard accessory bar (only works natively) since
            // that's a better default:
            //
            // Keyboard.setAccessoryBarVisible(false);
            //
            // For example, we might change the StatusBar color. This one below is
            // good for dark backgrounds and light text:
            // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }
}
