module.exports = app => {
    app.get('/login', app.api.user.get)
    app.post('/save', app.api.user.save)
}