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

  static async getAllCrm(search, page, filter) {
    try {
        const response = await axiosInstance.get(`/api/notifications-crm?search=${search}&page=${page}&filter=${filter}`);
        return response.data
    } catch (error) {
        throw error
    }
  }

  static async getAllErp(search, page, filter) {
    try {
        const response = await axiosInstance.get(`/api/notifications-erp?search=${search}&page=${page}&filter=${filter}`);
        return response.data
    } catch (error) {
        throw error
    }
  }

  static async getDataDashboard() {
    try {
        const response = await axiosInstance.get(`/api/notifications-dashboard`);
        return response.data
    } catch (error) {
        throw error
    }
  }
}

export default FetchNotifications