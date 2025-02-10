import {MMKV} from 'react-native-mmkv';

class Storage {
  private storage: MMKV;

  constructor() {
    this.storage = new MMKV();
  }

  setItem<T>(key: string, value: T): void {
    this.storage.set(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const value = this.storage.getString(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  deleteItem(key: string): void {
    this.storage.delete(key);
  }

  clearAll(): void {
    this.storage.clearAll();
  }
}

export const storage = new Storage();
