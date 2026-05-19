type Result<T, E> = { data: T; error: null } | { data: null; error: E };

export default class TryCatchUtil {
    public static current = new TryCatchUtil();

    public isDataNull(data: unknown | null) {
        if (data == null) return true;
        return false;
    }

    public async tryCatch<T, E = Error>(
        promise: Promise<T>,
    ): Promise<Result<T, E>> {
        try {
            const data = await promise;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: error as E };
        }
    }
}
