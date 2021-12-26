// Types of operation results
module.exports = {
    Success : {
        msg: "Success",
        code: 0
    },
    InternalErr : {
        msg: "Internal error occured!",
        code: 1
    },
    BadReqErr : {
        msg: "Bad request sent!",
        code: 2
    },
    NotFoundErr : {
        msg: "Page not found!",
        code: 3
    }
}