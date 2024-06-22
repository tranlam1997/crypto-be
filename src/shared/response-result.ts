export const ResponseResult = {
    success<T>(data?: T, message?: string, statusCode = 200) {
        return {
            message:  message ?? 'Success',
            statusCode,
            data: data ?? ''
        }
    }
}