import { StorageEngine } from '@ngxs/storage-plugin';
import { SecureStorage } from 'nativescript-secure-storage';

export class Storage implements StorageEngine {

    length: number;
    secureStorage: SecureStorage;

    constructor() {
        this.secureStorage = new SecureStorage();

        // clear data on first run
        this.secureStorage.clearAllOnFirstRunSync();
    }

    getItem(key: string): any {

        return this.secureStorage.getSync({ key })
    }

    setItem(key: string, value: any): void {
        this.secureStorage.setSync({ key, value })
    }

    removeItem(key: string): void {
        this.secureStorage.removeSync({ key });
    }

    clear(): void {
        this.secureStorage.removeAllSync({});
    }

}