// MOCO API integration module

class MocoAPI {
  constructor(domain, apiKey) {
    this.domain = domain;
    this.apiKey = apiKey;
    this.baseUrl = `https://${domain}.mocoapp.com/api/v1`;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Token token=${this.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorData = await response.clone().json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(`MOCO API Error: ${errorMessage}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Test API connection
  async testConnection() {
    try {
      await this.request('/users/me');
      return { success: true, message: 'Verbindung erfolgreich!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Get current user
  async getCurrentUser() {
    return await this.request('/users/me');
  }

  // Get activities (time entries)
  async getActivities(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/activities?${queryString}` : '/activities';
    return await this.request(endpoint);
  }

  // Create a new activity
  async createActivity(activityData) {
    return await this.request('/activities', {
      method: 'POST',
      body: JSON.stringify({ activity: activityData })
    });
  }

  // Update an existing activity
  async updateActivity(activityId, activityData) {
    return await this.request(`/activities/${activityId}`, {
      method: 'PUT',
      body: JSON.stringify({ activity: activityData })
    });
  }

  // Get projects
  async getProjects() {
    return await this.request('/projects');
  }
}

// Storage helper functions
const StorageHelper = {
  async getConfig() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['domain', 'apiKey'], (result) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve({
            domain: result.domain || null,
            apiKey: result.apiKey || null
          });
        }
      });
    });
  },

  async saveConfig(domain, apiKey) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ domain, apiKey }, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve();
        }
      });
    });
  },

  async clearConfig() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(['domain', 'apiKey'], () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve();
        }
      });
    });
  },

  async isConfigured() {
    const config = await this.getConfig();
    return config.domain && config.apiKey;
  }
};

// Make available for other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MocoAPI, StorageHelper };
}
