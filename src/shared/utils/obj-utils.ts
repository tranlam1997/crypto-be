export const ObjUtils = {
    isEmptyObj<T extends Record<PropertyKey, any>>(obj: T) {
        return Object.keys(obj).length === 0;
    }
}