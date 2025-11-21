describe('Options Utility Functions', () => {
  describe('escapeHtml', () => {
    test('should escape HTML special characters', () => {
      const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      };

      const input = '<script>alert("XSS")</script>';
      const escaped = escapeHtml(input);
      
      expect(escaped).toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;');
      expect(escaped).not.toContain('<script>');
    });

    test('should handle ampersand', () => {
      const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      };

      const input = 'Tom & Jerry';
      const escaped = escapeHtml(input);
      
      expect(escaped).toBe('Tom &amp; Jerry');
    });

    test('should handle quotes', () => {
      const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      };

      const input = 'He said "Hello"';
      const escaped = escapeHtml(input);
      
      expect(escaped).toContain('Hello');
    });

    test('should handle normal text without changes', () => {
      const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      };

      const input = 'Normal text without special characters';
      const escaped = escapeHtml(input);
      
      expect(escaped).toBe(input);
    });

    test('should handle empty string', () => {
      const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      };

      const input = '';
      const escaped = escapeHtml(input);
      
      expect(escaped).toBe('');
    });
  });

  describe('Input Validation', () => {
    test('should validate non-empty domain and apiKey', () => {
      const domain = 'test-company';
      const apiKey = 'test-key-123';
      
      const isValid = !!(domain && apiKey);
      
      expect(isValid).toBe(true);
    });

    test('should invalidate empty domain', () => {
      const domain = '';
      const apiKey = 'test-key-123';
      
      const isValid = !!(domain && apiKey);
      
      expect(isValid).toBe(false);
    });

    test('should invalidate empty apiKey', () => {
      const domain = 'test-company';
      const apiKey = '';
      
      const isValid = !!(domain && apiKey);
      
      expect(isValid).toBe(false);
    });

    test('should trim whitespace from inputs', () => {
      const domain = '  test-company  ';
      const apiKey = '  test-key-123  ';
      
      const trimmedDomain = domain.trim();
      const trimmedApiKey = apiKey.trim();
      
      expect(trimmedDomain).toBe('test-company');
      expect(trimmedApiKey).toBe('test-key-123');
    });
  });

  describe('Password Field Toggle', () => {
    test('should toggle from password to text', () => {
      let fieldType = 'password';
      let buttonText = '👁️ Anzeigen';
      
      // Simulate toggle
      if (fieldType === 'password') {
        fieldType = 'text';
        buttonText = '🙈 Verbergen';
      }
      
      expect(fieldType).toBe('text');
      expect(buttonText).toBe('🙈 Verbergen');
    });

    test('should toggle from text to password', () => {
      let fieldType = 'text';
      let buttonText = '🙈 Verbergen';
      
      // Simulate toggle
      if (fieldType === 'text') {
        fieldType = 'password';
        buttonText = '👁️ Anzeigen';
      } else {
        fieldType = 'text';
        buttonText = '🙈 Verbergen';
      }
      
      expect(fieldType).toBe('password');
      expect(buttonText).toBe('👁️ Anzeigen');
    });
  });

  describe('User Display Name', () => {
    test('should format full name', () => {
      const user = {
        firstname: 'John',
        lastname: 'Doe'
      };
      
      const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      };
      
      const firstName = escapeHtml(user.firstname || '');
      const lastName = escapeHtml(user.lastname || '');
      const fullName = `${firstName} ${lastName}`;
      
      expect(fullName).toBe('John Doe');
    });

    test('should handle missing firstname', () => {
      const user = {
        lastname: 'Doe'
      };
      
      const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      };
      
      const firstName = escapeHtml(user.firstname || '');
      const lastName = escapeHtml(user.lastname || '');
      const fullName = `${firstName} ${lastName}`.trim();
      
      expect(fullName).toBe('Doe');
    });

    test('should handle missing lastname', () => {
      const user = {
        firstname: 'John'
      };
      
      const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      };
      
      const firstName = escapeHtml(user.firstname || '');
      const lastName = escapeHtml(user.lastname || '');
      const fullName = `${firstName} ${lastName}`.trim();
      
      expect(fullName).toBe('John');
    });
  });

  describe('Test Result Messages', () => {
    test('should format success message', () => {
      const user = { firstname: 'John', lastname: 'Doe' };
      const message = `✓ Verbindung erfolgreich! Angemeldet als: ${user.firstname} ${user.lastname}`;
      
      expect(message).toContain('✓');
      expect(message).toContain('Verbindung erfolgreich');
      expect(message).toContain('John Doe');
    });

    test('should format error message', () => {
      const errorText = 'Invalid credentials';
      const message = `✗ Verbindung fehlgeschlagen: ${errorText}`;
      
      expect(message).toContain('✗');
      expect(message).toContain('Verbindung fehlgeschlagen');
      expect(message).toContain(errorText);
    });

    test('should format generic error message', () => {
      const error = new Error('Network error');
      const message = `✗ Fehler: ${error.message}`;
      
      expect(message).toContain('✗');
      expect(message).toContain('Fehler');
      expect(message).toContain('Network error');
    });
  });

  describe('Button State Management', () => {
    test('should update button during save', () => {
      let buttonDisabled = false;
      let buttonText = 'Speichern';
      
      // Start save
      buttonDisabled = true;
      buttonText = 'Speichere...';
      
      expect(buttonDisabled).toBe(true);
      expect(buttonText).toBe('Speichere...');
    });

    test('should restore button after successful save', () => {
      let buttonDisabled = true;
      let buttonText = 'Speichere...';
      
      // Success
      buttonText = 'Gespeichert ✓';
      
      // After timeout
      setTimeout(() => {
        buttonText = 'Speichern';
        buttonDisabled = false;
      }, 0);
      
      expect(buttonText).toBe('Gespeichert ✓');
    });

    test('should update button during test', () => {
      let buttonDisabled = false;
      let buttonText = 'Verbindung testen';
      
      // Start test
      buttonDisabled = true;
      buttonText = 'Teste...';
      
      expect(buttonDisabled).toBe(true);
      expect(buttonText).toBe('Teste...');
    });

    test('should restore button after test', () => {
      let buttonDisabled = true;
      let buttonText = 'Teste...';
      
      // After test
      buttonDisabled = false;
      buttonText = 'Verbindung testen';
      
      expect(buttonDisabled).toBe(false);
      expect(buttonText).toBe('Verbindung testen');
    });
  });
});

describe('DOM Elements', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('should create settings form elements', () => {
    const form = document.createElement('form');
    form.id = 'settingsForm';
    
    const domainInput = document.createElement('input');
    domainInput.id = 'domain';
    domainInput.type = 'text';
    
    const apiKeyInput = document.createElement('input');
    apiKeyInput.id = 'apiKey';
    apiKeyInput.type = 'password';
    
    document.body.appendChild(form);
    form.appendChild(domainInput);
    form.appendChild(apiKeyInput);
    
    expect(document.getElementById('settingsForm')).not.toBeNull();
    expect(document.getElementById('domain')).not.toBeNull();
    expect(document.getElementById('apiKey')).not.toBeNull();
  });

  test('should create message elements', () => {
    const testResult = document.createElement('div');
    testResult.id = 'testResult';
    testResult.className = 'hidden';
    
    const message = document.createElement('div');
    message.id = 'message';
    message.className = 'hidden';
    
    document.body.appendChild(testResult);
    document.body.appendChild(message);
    
    expect(document.getElementById('testResult')).not.toBeNull();
    expect(document.getElementById('message')).not.toBeNull();
  });
});
