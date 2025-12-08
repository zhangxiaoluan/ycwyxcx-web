type Timer = ReturnType<typeof setTimeout>;
type CachedKey = string | number;
export interface CachedData<TData = any, TParams = any> {
    data: TData;
    params: TParams;
    time: number;
}
interface RecordData extends CachedData {
    timer: Timer | undefined;
}
export declare const setCache: (key: CachedKey, cacheTime: number, cachedData: CachedData) => void;
export declare const getCache: (key: CachedKey) => RecordData | undefined;
export declare const clearCache: (key?: string | string[]) => void;
export {};
