module.exports = function (req, res, next) {
    if (!req.query.age) {
        res.send('give me age in url.');
    } else if (req.query.age < 18) {
        res.send('You are not allowed to access this page.');
    } else {
        next();
    }
}