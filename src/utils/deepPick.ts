type AnyObject = Record<string, any>;

/**
 * Retrieves the value at a given path within an object.
 *
 * @template T - The expected type of the value at the specified path.
 * @param {string} path - The dot-separated path string to the desired value.
 * @param {AnyObject} object - The object from which to retrieve the value.
 * @returns {T | undefined} - The value at the specified path, or `undefined` if the path does not exist.
 */
const pickValue = <T>(path: string, object: AnyObject): T | undefined => {
  return path
    .split('.')
    .reduce<AnyObject | undefined>((acc, key) => (acc && key in acc ? acc[key] : undefined), object) as T | undefined;
};

/**
 * Sets a value on an object at a specified path.
 *
 * @param obj - The object on which to set the value.
 * @param path - The path at which to set the value, represented as a dot-separated string.
 * @param value - The value to set at the specified path.
 */
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

/**
 * Checks if a given path exists and has a value within an object.
 *
 * @param object - The object to check the path in.
 * @param path - The path to check, represented as a dot-separated string.
 * @returns `true` if the path exists and has a value, otherwise `false`.
 */
const hasValue = (object: AnyObject, path: string): boolean => {
  return (
    path.split('.').reduce<AnyObject | undefined>((acc, key) => (acc && key in acc ? acc[key] : undefined), object) !==
    undefined
  );
};

/**
 * Recursively picks specified paths from an object and returns a new object containing only those paths.
 *
 * @template T - The type of the input object.
 * @param {T} object - The source object from which to pick values.
 * @param {string[]} paths - An array of strings representing the paths to pick from the source object.
 * @returns {Partial<T>} A new object containing only the picked paths and their corresponding values.
 */
export const deepPick = <T extends AnyObject>(object: T, paths: string[]): Partial<T> => {
  const obj: AnyObject = {};
  paths.forEach((path) => {
    if (hasValue(object, path)) {
      setValue(obj, path, pickValue(path, object));
    }
  });

  return obj as Partial<T>;
};
