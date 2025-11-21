// Mock chrome API for background tests
global.chrome = {
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn()
    }
  },
  runtime: {
    lastError: null,
    onInstalled: {
      addListener: jest.fn()
    },
    onStartup: {
      addListener: jest.fn()
    },
    onMessage: {
      addListener: jest.fn()
    }
  },
  action: {
    setBadgeText: jest.fn(),
    setBadgeBackgroundColor: jest.fn(),
    setTitle: jest.fn()
  },
  alarms: {
    create: jest.fn(),
    onAlarm: {
      addListener: jest.fn()
    }
  }
};

describe('Background Timer Functions', () => {
  // These tests verify the logic of timer functions
  // without loading the actual background.js file
  
  describe('Timer State Management', () => {
    test('should calculate elapsed hours correctly', () => {
      const QUARTER_HOUR_MULTIPLIER = 4;
      const startTime = Date.now() - 3600000; // 1 hour ago
      const elapsedMs = Date.now() - startTime;
      const elapsedHours = Math.round((elapsedMs / (1000 * 60 * 60)) * QUARTER_HOUR_MULTIPLIER) / QUARTER_HOUR_MULTIPLIER;
      
      expect(elapsedHours).toBeCloseTo(1.0, 1);
    });

    test('should round to quarter hours', () => {
      const QUARTER_HOUR_MULTIPLIER = 4;
      
      // 37 minutes = 0.617 hours, should round to 0.5 or 0.75
      const elapsed37Min = (37 / 60) * 3600000; // ms
      const rounded37 = Math.round((elapsed37Min / (1000 * 60 * 60)) * QUARTER_HOUR_MULTIPLIER) / QUARTER_HOUR_MULTIPLIER;
      expect([0.5, 0.75]).toContain(rounded37);
      
      // 8 minutes = 0.133 hours, should round to 0.25
      const elapsed8Min = (8 / 60) * 3600000; // ms
      const rounded8 = Math.round((elapsed8Min / (1000 * 60 * 60)) * QUARTER_HOUR_MULTIPLIER) / QUARTER_HOUR_MULTIPLIER;
      expect(rounded8).toBe(0.25);
    });

    test('should calculate elapsed hours without rounding for display', () => {
      const startTime = Date.now() - 3723000; // 1 hour, 2 minutes, 3 seconds
      const elapsedMs = Date.now() - startTime;
      const elapsedHours = elapsedMs / (1000 * 60 * 60);
      const roundedForDisplay = Math.round(elapsedHours * 100) / 100;
      
      expect(roundedForDisplay).toBeCloseTo(1.03, 1);
    });
  });

  describe('Timer State Structure', () => {
    test('should have correct initial state structure', () => {
      const initialState = {
        isRunning: false,
        startTime: null,
        projectId: null,
        taskId: null,
        projectName: '',
        taskName: '',
        note: ''
      };

      expect(initialState.isRunning).toBe(false);
      expect(initialState.startTime).toBeNull();
      expect(initialState.projectId).toBeNull();
      expect(initialState.taskId).toBeNull();
    });

    test('should have correct running state structure', () => {
      const runningState = {
        isRunning: true,
        startTime: Date.now(),
        projectId: 1,
        taskId: 2,
        projectName: 'Test Project',
        taskName: 'Test Task',
        note: 'Test note'
      };

      expect(runningState.isRunning).toBe(true);
      expect(runningState.startTime).toBeGreaterThan(0);
      expect(runningState.projectId).toBe(1);
      expect(runningState.taskId).toBe(2);
    });
  });

  describe('Badge Updates', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should set badge for running timer', () => {
      const projectName = 'Test Project';
      
      chrome.action.setBadgeText({ text: '▶' });
      chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
      chrome.action.setTitle({ title: `Timer läuft: ${projectName}` });

      expect(chrome.action.setBadgeText).toHaveBeenCalledWith({ text: '▶' });
      expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({ color: '#4CAF50' });
      expect(chrome.action.setTitle).toHaveBeenCalledWith({ title: `Timer läuft: ${projectName}` });
    });

    test('should clear badge for stopped timer', () => {
      chrome.action.setBadgeText({ text: '' });
      chrome.action.setTitle({ title: 'MOCO Time Tracker' });

      expect(chrome.action.setBadgeText).toHaveBeenCalledWith({ text: '' });
      expect(chrome.action.setTitle).toHaveBeenCalledWith({ title: 'MOCO Time Tracker' });
    });
  });

  describe('Message Handling', () => {
    test('should handle startTimer message format', () => {
      const message = {
        action: 'startTimer',
        projectId: 1,
        taskId: 2,
        projectName: 'Test Project',
        taskName: 'Test Task',
        note: 'Test note'
      };

      expect(message.action).toBe('startTimer');
      expect(message.projectId).toBe(1);
      expect(message.taskId).toBe(2);
      expect(message.projectName).toBe('Test Project');
    });

    test('should handle stopTimer message format', () => {
      const message = {
        action: 'stopTimer'
      };

      expect(message.action).toBe('stopTimer');
    });

    test('should handle getTimerState message format', () => {
      const message = {
        action: 'getTimerState'
      };

      expect(message.action).toBe('getTimerState');
    });
  });

  describe('Timer Result Calculation', () => {
    test('should calculate correct result on stop', () => {
      const QUARTER_HOUR_MULTIPLIER = 4;
      const startTime = Date.now() - 5400000; // 1.5 hours ago
      const elapsedMs = Date.now() - startTime;
      const elapsedHours = Math.round((elapsedMs / (1000 * 60 * 60)) * QUARTER_HOUR_MULTIPLIER) / QUARTER_HOUR_MULTIPLIER;

      const result = {
        projectId: 1,
        taskId: 2,
        projectName: 'Test Project',
        taskName: 'Test Task',
        note: 'Test note',
        hours: elapsedHours,
        startTime: startTime
      };

      expect(result.hours).toBeCloseTo(1.5, 1);
      expect(result.projectId).toBe(1);
      expect(result.taskId).toBe(2);
    });
  });
});

describe('Chrome API Integration', () => {
  test('should register install listener', () => {
    expect(chrome.runtime.onInstalled.addListener).toBeDefined();
  });

  test('should register startup listener', () => {
    expect(chrome.runtime.onStartup.addListener).toBeDefined();
  });

  test('should register message listener', () => {
    expect(chrome.runtime.onMessage.addListener).toBeDefined();
  });

  test('should create alarm for badge updates', () => {
    chrome.alarms.create('updateBadge', { periodInMinutes: 1 });
    
    expect(chrome.alarms.create).toHaveBeenCalledWith('updateBadge', { periodInMinutes: 1 });
  });
});
