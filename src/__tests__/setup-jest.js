const { afterEach, beforeEach, jest } = require('@jest/globals');
const { cleanup } = require('@testing-library/react');
require('@testing-library/jest-dom');
require('whatwg-fetch');
const fs = require('fs');
const path = require('path');

// Load db.json data
const dbPath = path.resolve(process.cwd(), 'db.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

beforeEach(() => {
  // Mock fetch to return local data
  global.fetch = jest.fn((url) => {
    if (url.includes('/movies/1')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(dbData.movies[0])
      });
    }
    if (url.includes('/movies')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(dbData.movies)
      });
    }
    if (url.includes('/directors')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(dbData.directors)
      });
    }
    if (url.includes('/actors')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(dbData.actors)
      });
    }
    return Promise.reject(new Error('Not found'));
  });
});

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});