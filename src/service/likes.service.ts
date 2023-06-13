import likesModel from "../model/likes.model";
interface Like {
  users_id: number;
  routines_id: number;
  like: boolean;
}

export default {
  createLike(likeData: Like) {
    const { users_id: userId, routines_id: routineId, like } = likeData;
    return likesModel.createLike(userId, routineId, like);
  },

  getTotalLikes(routineId: string) {
    const parsedRoutineId = parseInt(routineId, 10);
    return likesModel.getTotalLikes(parsedRoutineId);
  },
};
