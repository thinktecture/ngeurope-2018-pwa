export class ModelHelperService {
  public static extractIdFromUrl(url: string): number {
    url += url.endsWith('/') ? '' : '/';

    const parts = url.split('/');

    return +parts[parts.length - 2];
  }

  public static objectPropertiesToArray(obj: Object): Array<{ key: string, value: any }> {
    return Object.keys(obj)
      .map(key => {
        return {
          key,
          value: obj[key]
        };
      });
  }
}
