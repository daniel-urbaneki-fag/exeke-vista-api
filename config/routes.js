module.exports = app => {
    app.post('/login', app.api.autenticacoes.login)
    app.get('/getsolicitacoes', app.api.autenticacoes.authenticateJWT, app.api.solicitacoes.getSolicitacoes)
    app.post('/createempresa', app.api.autenticacoes.authenticateJWT, app.api.empresa.create)
    app.post('/createuser', app.api.autenticacoes.authenticateJWT, app.api.user.create)
    app.post('/createsolicitacao', app.api.autenticacoes.authenticateJWT, app.api.solicitacoes.createSolicitacao)
}