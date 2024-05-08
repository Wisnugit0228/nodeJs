const routes = ([
{
    method: 'GET',
    path : '/hello/{name?}',
    handler: (request, h) => {
        const {name = "stranger"} = request.params;
        const {lang} = request.query;

        if(lang === 'id') {
            return `hai, ${name}`;
        }

        return `hallo, ${name}`;
    }
},
{
    method:'GET',
    path: '/users/{username?}',
    handler: (request, h) => {
        const {username = 'stranger'} = request.params;
        return `hello , ${username}`;
    }
},
{
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return "homepage";
    }
},
{
    method:'*',
    path:'/',
    handler : (request,h) => {
        return "halaman tidak bisa diakses dengan method tersebut"
    }
},
{
    method:'GET',
    path: '/about',
    handler: (request,h) => {
        return "hello world about"
    }
},
{
    method:'*',
    path:'/about',
    handler: (request, h) => {
        return "halaman tidak bisa diakses dengan method tersebut"
    }
},
{
    method:'*',
    path:'/{any*}',
    handler: (request, h) => {
        return "halaman tidak ditemukan"
    }
}
]);

module.exports = routes;