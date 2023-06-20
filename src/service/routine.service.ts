import routineModel from "../model/routine.model";
interface Routine {
  user_id: number;
  routine_name: string;
  skin_type: string;
  routine_product: number[];
  public: boolean;
  weather_type: string;
  description: string;
}

interface UpdateRoutine {
  routine_id: number;
  routine_product: number[] | undefined;
  public: boolean | undefined;
}

interface Description {
  id: number;
  description: string;
}

export default {
  createRoutine(routineData: Routine) {
    let {
      user_id: id,
      routine_name: routineName,
      skin_type: skinType,
      routine_product: routineProduct,
      public: routinePublic,
      weather_type: weatherTag,
      description
    } = routineData;
    return routineModel.createRoutine(
      id,
      routineName,
      skinType,
      routineProduct,
      routinePublic,
      weatherTag,
      description
    );
  },

  getRoutineBySkintype(skintype: string) {
    return routineModel.getRoutineBySkintype(skintype);
  },

  getRoutineByWeatherType(weatherType: string) {
    return routineModel.getRoutineByWeatherType(weatherType);
  },

  getRoutineByUserId(userId: string) {
    const parsedId: number = parseInt(userId, 10);
    return routineModel.getRoutineByUserId(parsedId);
  },

  updateRoutineUser(updateData: UpdateRoutine) {
    const {
      routine_id: routineId,
      routine_product: routineProduct,
      public: routinePublic,
    } = updateData;
    return routineModel.updateRoutineUser(
      routineId,
      routineProduct,
      routinePublic
    );
  },

  updateDescription(newDescription: Description) {
    const {id, description} = newDescription;
    return routineModel.updateDescription(id, description)
  },

  deleteRoutineUser(routineId: string) {
    const routineIdToNumber = parseInt(routineId, 10);
    return routineModel.deleteRoutineUser(routineIdToNumber);
  }
};
