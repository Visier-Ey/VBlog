import { get, post, put, del } from '../utils/http';

const API_BASE_URL = 'http://localhost:3000/backend';
const prefix_url = API_BASE_URL + '/recent';
export interface RecentEvent {
    type?: 'event';
    content: string;
    date?: string;
    url?: string;
}
export interface RecentNotice {
    type?: 'notice';
    content: string;
    date?: string;
    url?: string;
}

export const recentService = {
    getRecentNotices() {
        return get(`${prefix_url}/getNotices`);
    },
    getRecentEvents() {
        return get(`${prefix_url}/getEvents`);
    },
    addRecentNotices(recent: Partial<RecentNotice>) {
        return post(`${prefix_url}/setNotices`, recent);
    },
    // addRecentEvents(recent: Partial<RecentEvent>) {
    //     return post(`${prefix_url}/setEvents`, recent);
    // },
    addRecentEvents(formData: FormData) {
        return post(`${prefix_url}/setEvents`, formData);
  }
}