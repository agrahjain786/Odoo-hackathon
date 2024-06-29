interface AuthStorage {
  uid: string;
  email: string;
  name: string;
  token: string;
}

export default class AuthStore {
  private static instances: { [key: string]: any } = {};

  public static setAuthData(id: string, authData: AuthStorage) {
    AuthStore.setInstance(id, authData);
  }

  public static setInstance(id: string, authData: AuthStorage): void {
    AuthStore.instances[id] = authData;
  }

  public static getInstance(id: string): AuthStore {
    if (!AuthStore.hasInstance(id)) {
      throw new Error("No instance found for the given email");
    }

    return AuthStore.instances[id];
  }

  public static hasInstance(email: string): boolean {
    return Boolean(AuthStore.instances[email]);
  }

  public static getAllInstances() {
    return AuthStore.instances;
  }

  public static deleteInstance(email: string): void {
    if (!AuthStore.instances[email]) return;

    delete AuthStore.instances[email];
  }

  public static resetStore() {
    AuthStore.instances = {};
  }
}
