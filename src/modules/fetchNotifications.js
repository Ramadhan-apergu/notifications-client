import axiosInstance from "./axios";

class FetchNotifications {
  static async getAll(search, page, filter) {
    try {
        const response = await axiosInstance.get(`/api/notifications?search=${search}&page=${page}&filter=${filter}`);
        return response.data
    } catch (error) {
        throw error
    }
  }
}

export default FetchNotifications