exports.bd = {
    client: 'pg',
    connection: {
        host    : "ec2-107-22-250-33.compute-1.amazonaws.com",
        user    : "qcxzihvjqclgmo",
        password: "9334dd9665302074a713736626bf8d36bd4283c575282bf86a225504ae5e4fce",
        database: "d4i41766a6ipho",
        port    : 5432,
        ssl     : true,
        charset : "utf8"
    }
}

exports.token = {
    value : 'talakanodetoken'
}
// postgres://qcxzihvjqclgmo:9334dd9665302074a713736626bf8d36bd4283c575282bf86a225504ae5e4fce@ec2-107-22-250-33.compute-1.amazonaws.com:5432/d4i41766a6ipho
//heroku pg:psql postgresql-flat-89200 --app gmastersupreme