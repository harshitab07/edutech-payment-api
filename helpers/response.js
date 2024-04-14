const Response = (res, status, message, data, error) => {
    return res.status(status === '' ? 200 : status).send({
        success: status === 200 ? true : false,
        message,
        data: data || null,
        error: error || null
    });
};

export default Response;