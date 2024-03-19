
interface PlainObject<T = unknown> {
  [k: string]: T;
}

interface PageData<T> {
  data: T;
  total: number;
}