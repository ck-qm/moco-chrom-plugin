const { MocoAPI, StorageHelper } = require('../scripts/api.js');

describe('MocoAPI', () => {
  let api;
  const testDomain = 'test-company';
  const testApiKey = 'test-api-key-123';

  beforeEach(() => {
    api = new MocoAPI(testDomain, testApiKey);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    test('should initialize with domain and apiKey', () => {
      expect(api.domain).toBe(testDomain);
      expect(api.apiKey).toBe(testApiKey);
      expect(api.baseUrl).toBe(`https://${testDomain}.mocoapp.com/api/v1`);
    });
  });

  describe('request', () => {
    test('should make successful API request', async () => {
      const mockData = { id: 1, name: 'Test User' };
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockData
      });

      const result = await api.request('/users/me');

      expect(global.fetch).toHaveBeenCalledWith(
        `https://${testDomain}.mocoapp.com/api/v1/users/me`,
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': `Token token=${testApiKey}`,
            'Content-Type': 'application/json'
          })
        })
      );
      expect(result).toEqual(mockData);
    });

    test('should handle API errors with JSON error message', async () => {
      const errorMessage = 'Unauthorized';
      global.fetch.mockResolvedValue({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        clone: () => ({
          json: async () => ({ message: errorMessage })
        })
      });

      await expect(api.request('/users/me')).rejects.toThrow(`MOCO API Error: ${errorMessage}`);
    });

    test('should handle API errors without JSON response', async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        clone: () => ({
          json: async () => { throw new Error('No JSON'); }
        })
      });

      await expect(api.request('/users/me')).rejects.toThrow('MOCO API Error: Internal Server Error');
    });

    test('should handle network errors', async () => {
      global.fetch.mockRejectedValue(new Error('Network error'));

      await expect(api.request('/users/me')).rejects.toThrow('Network error');
    });
  });

  describe('testConnection', () => {
    test('should return success on valid connection', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1, name: 'Test' })
      });

      const result = await api.testConnection();

      expect(result).toEqual({ success: true, message: 'Verbindung erfolgreich!' });
    });

    test('should return error on invalid connection', async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        clone: () => ({
          json: async () => ({ message: 'Invalid credentials' })
        })
      });

      const result = await api.testConnection();

      expect(result.success).toBe(false);
      expect(result.message).toContain('Invalid credentials');
    });
  });

  describe('getCurrentUser', () => {
    test('should get current user', async () => {
      const mockUser = { id: 1, firstname: 'John', lastname: 'Doe' };
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockUser
      });

      const result = await api.getCurrentUser();

      expect(result).toEqual(mockUser);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/users/me'),
        expect.any(Object)
      );
    });
  });

  describe('getActivities', () => {
    test('should get activities without parameters', async () => {
      const mockActivities = [{ id: 1, hours: 2.5 }];
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockActivities
      });

      const result = await api.getActivities();

      expect(result).toEqual(mockActivities);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/activities'),
        expect.any(Object)
      );
    });

    test('should get activities with query parameters', async () => {
      const mockActivities = [{ id: 1, hours: 2.5 }];
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockActivities
      });

      const params = { from: '2024-01-01', to: '2024-01-31' };
      const result = await api.getActivities(params);

      expect(result).toEqual(mockActivities);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/activities?from=2024-01-01&to=2024-01-31'),
        expect.any(Object)
      );
    });
  });

  describe('createActivity', () => {
    test('should create activity', async () => {
      const activityData = {
        date: '2024-01-01',
        hours: 2.5,
        project_id: 1,
        task_id: 1,
        description: 'Test activity'
      };
      const mockResponse = { id: 123, ...activityData };
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      });

      const result = await api.createActivity(activityData);

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/activities'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ activity: activityData })
        })
      );
    });
  });

  describe('updateActivity', () => {
    test('should update activity', async () => {
      const activityId = 123;
      const updateData = { hours: 3.5 };
      const mockResponse = { id: activityId, hours: 3.5 };
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      });

      const result = await api.updateActivity(activityId, updateData);

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/activities/${activityId}`),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ activity: updateData })
        })
      );
    });
  });

  describe('getProjects', () => {
    test('should get projects', async () => {
      const mockProjects = [
        { id: 1, name: 'Project 1' },
        { id: 2, name: 'Project 2' }
      ];
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockProjects
      });

      const result = await api.getProjects();

      expect(result).toEqual(mockProjects);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/projects'),
        expect.any(Object)
      );
    });
  });
});

describe('StorageHelper', () => {
  beforeEach(() => {
    global.chrome = {
      storage: {
        local: {
          get: jest.fn(),
          set: jest.fn(),
          remove: jest.fn()
        }
      },
      runtime: {
        lastError: null
      }
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getConfig', () => {
    test('should get configuration successfully', async () => {
      const mockConfig = { domain: 'test-company', apiKey: 'test-key' };
      global.chrome.storage.local.get.mockImplementation((keys, callback) => {
        callback(mockConfig);
      });

      const result = await StorageHelper.getConfig();

      expect(result).toEqual(mockConfig);
      expect(global.chrome.storage.local.get).toHaveBeenCalledWith(
        ['domain', 'apiKey'],
        expect.any(Function)
      );
    });

    test('should handle missing configuration', async () => {
      global.chrome.storage.local.get.mockImplementation((keys, callback) => {
        callback({});
      });

      const result = await StorageHelper.getConfig();

      expect(result).toEqual({ domain: null, apiKey: null });
    });

    test('should handle chrome runtime error', async () => {
      const errorMessage = 'Storage error';
      global.chrome.storage.local.get.mockImplementation((keys, callback) => {
        global.chrome.runtime.lastError = { message: errorMessage };
        callback({});
      });

      await expect(StorageHelper.getConfig()).rejects.toThrow(errorMessage);
    });
  });

  describe('saveConfig', () => {
    test('should save configuration successfully', async () => {
      global.chrome.storage.local.set.mockImplementation((data, callback) => {
        callback();
      });

      await expect(StorageHelper.saveConfig('test-domain', 'test-key')).resolves.toBeUndefined();

      expect(global.chrome.storage.local.set).toHaveBeenCalledWith(
        { domain: 'test-domain', apiKey: 'test-key' },
        expect.any(Function)
      );
    });

    test('should handle save error', async () => {
      const errorMessage = 'Save failed';
      global.chrome.storage.local.set.mockImplementation((data, callback) => {
        global.chrome.runtime.lastError = { message: errorMessage };
        callback();
      });

      await expect(StorageHelper.saveConfig('test', 'key')).rejects.toThrow(errorMessage);
    });
  });

  describe('clearConfig', () => {
    test('should clear configuration successfully', async () => {
      global.chrome.storage.local.remove.mockImplementation((keys, callback) => {
        callback();
      });

      await expect(StorageHelper.clearConfig()).resolves.toBeUndefined();

      expect(global.chrome.storage.local.remove).toHaveBeenCalledWith(
        ['domain', 'apiKey'],
        expect.any(Function)
      );
    });

    test('should handle clear error', async () => {
      const errorMessage = 'Clear failed';
      global.chrome.storage.local.remove.mockImplementation((keys, callback) => {
        global.chrome.runtime.lastError = { message: errorMessage };
        callback();
      });

      await expect(StorageHelper.clearConfig()).rejects.toThrow(errorMessage);
    });
  });

  describe('isConfigured', () => {
    test('should return truthy when configured', async () => {
      global.chrome.storage.local.get.mockImplementation((keys, callback) => {
        global.chrome.runtime.lastError = null;
        callback({ domain: 'test', apiKey: 'key' });
      });

      const result = await StorageHelper.isConfigured();

      expect(result).toBeTruthy();
    });

    test('should return falsy when domain is missing', async () => {
      global.chrome.storage.local.get.mockImplementation((keys, callback) => {
        global.chrome.runtime.lastError = null;
        callback({ apiKey: 'key' });
      });

      const result = await StorageHelper.isConfigured();

      expect(result).toBeFalsy();
    });

    test('should return falsy when apiKey is missing', async () => {
      global.chrome.storage.local.get.mockImplementation((keys, callback) => {
        global.chrome.runtime.lastError = null;
        callback({ domain: 'test' });
      });

      const result = await StorageHelper.isConfigured();

      expect(result).toBeFalsy();
    });

    test('should return falsy when both are missing', async () => {
      global.chrome.storage.local.get.mockImplementation((keys, callback) => {
        global.chrome.runtime.lastError = null;
        callback({});
      });

      const result = await StorageHelper.isConfigured();

      expect(result).toBeFalsy();
    });
  });
});
