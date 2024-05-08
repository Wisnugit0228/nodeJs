const response = (stattusCode, data, message, res) => {
    res.json(stattusCode, [
        {
            payload: data,
            message,
            metadata:{
                prev: '',
                next: '',
                current: '',            
            },
        },
    ]);
};

module.exports = response;