import { AppDataSource } from "../../../data-source";
import { ActivityTracker } from "./activity_tracker.model";
import { IActivityTracker } from "./activity_tracker.types";

const activityTrackerRepository = AppDataSource.getRepository(ActivityTracker);
export default class ActivityTrackerRepository {

    static async logActivity(data:IActivityTracker){
        return activityTrackerRepository.save(data);
    }
}