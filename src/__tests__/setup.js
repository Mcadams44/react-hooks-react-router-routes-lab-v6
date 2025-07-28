import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import 'whatwg-fetch';
import {Blob} from 'node:buffer';
import fs from 'fs';
import path from 'path';

// Load db.json data
const dbPath = path.resolve(process.cwd(), 'db.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

beforeEach(() => {
  // Mock fetch to return local data
  global.fetch = vi.fn((url) => {
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
    vi.restoreAllMocks();
})
