const { nanoid } = require("nanoid");
const books = require("./data");

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if(pageCount === readPage){
        const finished = true;
        if(name === undefined)
        {
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }

        const newBook = {
            id,name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
        };

        books.push(newBook);

        const isSuccess = books.filter((book) => book.id === id).length > 0;


        if (isSuccess) {
            const response = h.response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: id,
                    finished: finished
                }
            });
            response.code(201);
            return response;
        }
    
        const response = h.response({
            status: 'fail',
            message: 'buku gagal ditambahkan',
        });
        response.code(500);
        return response;

        
    };

    if(readPage < pageCount) {
        const finished = false;
        if(name === undefined)
        {
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }

        const newBook = {
            id,name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
        };

        books.push(newBook);

        const isSuccess = books.filter((book) => book.id === id).length > 0;


        if (isSuccess) {
            const response = h.response({
                status: 'success',
                message: 'buku berhasil ditambahkan',
                data: {
                    bookId: id,
                    finished: finished
                }
            });
            response.code(201);
            return response;
        }
    
        const response = h.response({
            status: 'fail',
            message: 'buku gagal ditambahkan',
        });
        response.code(500);
        return response;
    }


    if(readPage > pageCount) {
        if(name === undefined)
        {
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    
};


const getAllBooksHandler = () => ({
    status : 'success',
    data: {
        books,
    }
});


const getBookByIdHandlre = (request, h) => {
    const {id} = request.params;

    const book = books.filter((book) => book.id===id)[0];

    if(book !== undefined){
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    const response = h.response ({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};


const editBookByIdHandler = (request, h) => {
    const {id} = request.params;

    const index = books.findIndex((book) => book.id === id );

    if(index === -1){
        const response = h.response ({
            status: 'fail',
            message: `Buku dengan id ${id} tidak ditemukan`,
        });
        response.code(404);
        return response;
    }

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const updatedAt = new Date().toISOString();

    if(pageCount === readPage) {
        if(name === undefined)
        {
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }
        const finished = true;
        books[index] = {
            ...books[index], 
            name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt
        };
        const response = h.response({
            status: 'success',
            message: 'buku berhasil diperbaruhi',
        });
        response.code(200);
        return response;
    };


    if(pageCount > readPage) {
        if(name === undefined)
        {
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }
        const finished = false;
        books[index] = {
            ...books[index], 
            name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbaruhi',
        });
        response.code(200);
        return response;
    };

    if(pageCount < readPage) {
        if(name === undefined)
        {
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    };


}


const deleteBookByIdHandler = (request, h) => {
    const {id} = request.params;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'buku berhasil dihapus',
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(400);
    return response;
}



module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandlre, editBookByIdHandler, deleteBookByIdHandler };