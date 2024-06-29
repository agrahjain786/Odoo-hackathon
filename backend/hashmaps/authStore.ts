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

  public static hasInstance(id: string): boolean {
    return Boolean(AuthStore.instances[id]);
  }

  public static getAllInstances() {
    return AuthStore.instances;
  }

  public static deleteInstance(id: string): void {
    if (!AuthStore.instances[id]) return;

    delete AuthStore.instances[id];
  }

  public static resetStore() {
    AuthStore.instances = {};
  }
}
