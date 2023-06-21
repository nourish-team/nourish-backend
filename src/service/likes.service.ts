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

  getHistoryLike(userIdParam: string) {
    const userId: number =  parseInt(userIdParam, 10);
    return likesModel.getHistoryLike(userId)
  },

  getIdLike(useridQuery: string, routineIdQuery: string) {
    const userId = parseInt(useridQuery, 10);
    const routineId = parseInt(routineIdQuery, 10);
    return likesModel.getIdLike(userId, routineId);
  },

  deleteLike(id: string) {
    const likeId: number = parseInt(id, 10);
    return likesModel.deleteLike(likeId);
  }
};
