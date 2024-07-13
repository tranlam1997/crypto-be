export const responseResult = {
  success<T>(data?: T, message?: string, statusCode = 200) {
    return {
      message: message ?? 'Success',
      statusCode,
      data: data ?? '',
    };
  },
};
