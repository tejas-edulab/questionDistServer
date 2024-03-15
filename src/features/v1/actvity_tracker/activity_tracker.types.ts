import { ActivityTracker } from "./activity_tracker.model"
type OmittedProperties = 'id' | 'updatedAt' | 'createdAt' ;

export type  IActivityTracker = Omit<ActivityTracker,OmittedProperties>


// export type  IAllocatedAssessment = Omit<AllocatedAssessment,OmittedProperties>
