type AnyObject = Record<string, any>;

const pickValue = <T>(path: string, object: AnyObject): T | undefined => {
  return path
    .split('.')
    .reduce<AnyObject | undefined>((acc, key) => (acc && key in acc ? acc[key] : undefined), object) as T | undefined;
};

const setValue = (obj: AnyObject, path: string, value: unknown): void => {
  const keys = path.split('.');
  let current: AnyObject = obj;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key] as AnyObject;
    }
  });
};

const hasValue = (object: AnyObject, path: string): boolean => {
  return (
    path.split('.').reduce<AnyObject | undefined>((acc, key) => (acc && key in acc ? acc[key] : undefined), object) !==
    undefined
  );
};

export const deepPick = <T extends AnyObject>(object: T, paths: string[]): Partial<T> => {
  const obj: AnyObject = {};
  paths.forEach((path) => {
    if (hasValue(object, path)) {
      setValue(obj, path, pickValue(path, object));
    }
  });

  return obj as Partial<T>;
};
