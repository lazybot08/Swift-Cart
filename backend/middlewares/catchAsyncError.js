//instead of putting try catch on every async function we will create a generalised error handler. Such errors are necessary to be handled because server do not get any response and server willl crash in such situations if not handled
//accept a async function as parameter and use promises to handle the async errors
const asyncErrorHandler = (asyncFunc) => (req, res, next) => {
    Promise.resolve(asyncFunc(req, res, next)).catch(next);
}

module.exports = asyncErrorHandler