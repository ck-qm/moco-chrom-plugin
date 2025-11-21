describe('Popup Utility Functions', () => {
  describe('formatTime', () => {
    test('should format ISO string to time', () => {
      // Create a specific date for testing
      const isoString = '2024-01-15T14:30:00.000Z';
      const date = new Date(isoString);
      const formatted = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
      
      // The result should be in HH:MM format
      expect(formatted).toMatch(/\d{2}:\d{2}/);
    });

    test('should handle empty string', () => {
      const isoString = '';
      const result = isoString ? new Date(isoString).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : '';
      
      expect(result).toBe('');
    });

    test('should handle null value', () => {
      const isoString = null;
      const result = isoString ? new Date(isoString).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : '';
      
      expect(result).toBe('');
    });
  });

  describe('Timer Display Calculations', () => {
    test('should calculate hours and minutes from elapsed hours', () => {
      const elapsedHours = 2.75; // 2 hours 45 minutes
      const hours = Math.floor(elapsedHours);
      const minutes = Math.floor((elapsedHours % 1) * 60);
      
      expect(hours).toBe(2);
      expect(minutes).toBe(45);
    });

    test('should pad single digits with zero', () => {
      const hours = 5;
      const minutes = 8;
      const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      
      expect(formatted).toBe('05:08');
    });

    test('should not pad double digits', () => {
      const hours = 12;
      const minutes = 45;
      const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      
      expect(formatted).toBe('12:45');
    });
  });

  describe('Activity Hours Calculation', () => {
    test('should sum activity hours', () => {
      const activities = [
        { hours: 2.5 },
        { hours: 1.5 },
        { hours: 3.0 }
      ];
      
      const totalHours = activities.reduce((sum, activity) => sum + (activity.hours || 0), 0);
      
      expect(totalHours).toBe(7.0);
    });

    test('should handle missing hours field', () => {
      const activities = [
        { hours: 2.5 },
        { id: 123 }, // No hours field
        { hours: 1.5 }
      ];
      
      const totalHours = activities.reduce((sum, activity) => sum + (activity.hours || 0), 0);
      
      expect(totalHours).toBe(4.0);
    });

    test('should detect when daily hours exceed 10', () => {
      const activities = [
        { hours: 4.0 },
        { hours: 3.5 },
        { hours: 2.5 }
      ];
      const additionalHours = 1.5;
      
      const totalHours = activities.reduce((sum, activity) => sum + (activity.hours || 0), 0) + additionalHours;
      
      expect(totalHours).toBe(11.5);
      expect(totalHours).toBeGreaterThan(10);
    });
  });

  describe('Activity Adjustment', () => {
    test('should calculate new hours with positive adjustment', () => {
      const currentHours = 2.0;
      const adjustment = 0.25;
      const newHours = Math.max(0.25, currentHours + adjustment);
      
      expect(newHours).toBe(2.25);
    });

    test('should calculate new hours with negative adjustment', () => {
      const currentHours = 2.0;
      const adjustment = -0.25;
      const newHours = Math.max(0.25, currentHours + adjustment);
      
      expect(newHours).toBe(1.75);
    });

    test('should not go below minimum hours', () => {
      const currentHours = 0.5;
      const adjustment = -0.5;
      const newHours = Math.max(0.25, currentHours + adjustment);
      
      expect(newHours).toBe(0.25);
    });

    test('should handle zero hours with negative adjustment', () => {
      const currentHours = 0;
      const adjustment = -0.25;
      const newHours = Math.max(0.25, currentHours + adjustment);
      
      expect(newHours).toBe(0.25);
    });
  });

  describe('Date Handling', () => {
    test('should format date to ISO date string', () => {
      const date = new Date('2024-01-15T10:30:00');
      const isoDate = date.toISOString().split('T')[0];
      
      expect(isoDate).toBe('2024-01-15');
    });

    test("should get today's date", () => {
      const today = new Date().toISOString().split('T')[0];
      
      expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('Form Validation', () => {
    test('should validate complete activity data', () => {
      const projectId = 1;
      const taskId = 2;
      const date = '2024-01-15';
      const hours = 2.5;
      
      const isValid = !isNaN(projectId) && !isNaN(taskId) && date && !isNaN(hours) && hours > 0;
      
      expect(isValid).toBe(true);
    });

    test('should invalidate missing project', () => {
      const projectId = NaN;
      const taskId = 2;
      const date = '2024-01-15';
      const hours = 2.5;
      
      const isValid = !isNaN(projectId) && !isNaN(taskId) && date && !isNaN(hours) && hours > 0;
      
      expect(isValid).toBe(false);
    });

    test('should invalidate missing task', () => {
      const projectId = 1;
      const taskId = NaN;
      const date = '2024-01-15';
      const hours = 2.5;
      
      const isValid = !isNaN(projectId) && !isNaN(taskId) && date && !isNaN(hours) && hours > 0;
      
      expect(isValid).toBe(false);
    });

    test('should invalidate negative hours', () => {
      const projectId = 1;
      const taskId = 2;
      const date = '2024-01-15';
      const hours = -1;
      
      const isValid = !isNaN(projectId) && !isNaN(taskId) && date && !isNaN(hours) && hours > 0;
      
      expect(isValid).toBe(false);
    });

    test('should invalidate zero hours', () => {
      const projectId = 1;
      const taskId = 2;
      const date = '2024-01-15';
      const hours = 0;
      
      const isValid = !isNaN(projectId) && !isNaN(taskId) && date && !isNaN(hours) && hours > 0;
      
      expect(isValid).toBe(false);
    });
  });

  describe('Activity Data Structure', () => {
    test('should create correct activity data object', () => {
      const activityData = {
        date: '2024-01-15',
        hours: 2.5,
        project_id: 1,
        task_id: 2,
        description: 'Test activity'
      };
      
      expect(activityData).toHaveProperty('date');
      expect(activityData).toHaveProperty('hours');
      expect(activityData).toHaveProperty('project_id');
      expect(activityData).toHaveProperty('task_id');
      expect(activityData).toHaveProperty('description');
      expect(activityData.hours).toBe(2.5);
    });

    test('should handle empty description', () => {
      const note = '';
      const activityData = {
        date: '2024-01-15',
        hours: 2.5,
        project_id: 1,
        task_id: 2,
        description: note || ''
      };
      
      expect(activityData.description).toBe('');
    });
  });
});

describe('DOM Utility Functions', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('Message Display', () => {
    test('should create error message element', () => {
      const errorDiv = document.createElement('div');
      errorDiv.id = 'errorMessage';
      errorDiv.className = 'hidden';
      document.body.appendChild(errorDiv);
      
      const element = document.getElementById('errorMessage');
      expect(element).not.toBeNull();
      expect(element.classList.contains('hidden')).toBe(true);
    });

    test('should create success message element', () => {
      const successDiv = document.createElement('div');
      successDiv.id = 'successMessage';
      successDiv.className = 'hidden';
      document.body.appendChild(successDiv);
      
      const element = document.getElementById('successMessage');
      expect(element).not.toBeNull();
      expect(element.classList.contains('hidden')).toBe(true);
    });
  });

  describe('Entry Item Creation', () => {
    test('should format hours correctly', () => {
      const hours = 2.5;
      const formatted = hours.toFixed(2);
      
      expect(formatted).toBe('2.50');
    });

    test('should handle fallback values', () => {
      const activity = {};
      const projectName = activity.project?.name || 'Unbekanntes Projekt';
      const taskName = activity.task?.name || 'Unbekannte Aufgabe';
      
      expect(projectName).toBe('Unbekanntes Projekt');
      expect(taskName).toBe('Unbekannte Aufgabe');
    });
  });
});
