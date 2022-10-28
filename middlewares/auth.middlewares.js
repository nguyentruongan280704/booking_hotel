module.exports.requireAuth = (req, res, next) => {
    // console.log(req.cookies);
    // console.log(req.signedCookies); //{}
    if(Object.keys(req.signedCookies).length === 0) {
        res.redirect("/auth/login");
    } else {
        next();
    }
};

module.exports.notRequireAuth = (req, res, next) => {
    // console.log(req.cookies);
    // console.log(req.signedCookies); //{}
    if(Object.keys(req.signedCookies).length !== 0) {
        res.redirect("/");
    } else {
        next();
    }
};

module.exports.requireAdmin = (req, res, next) => {
    let { userId } = req.signedCookies;
    // console.log(req.signedCookies);
    if(req.signedCookies.role === "admin") {
        next();
    } else {
        res.redirect(`/users/${userId}/blogs`);
    }
}