module.exports = app => {
    app.post('/login', app.api.autenticacoes.login)
    app.get('/getsolicitacoes', app.api.autenticacoes.authenticateJWT, app.api.solicitacoes.getSolicitacoes)
    app.post('/createempresa', app.api.empresa.create)
    app.post('/createuser', app.api.user.create)
    app.post('/createsolicitacao', app.api.solicitacoes.createSolicitacao)
    app.get('/verifytoken', app.api.autenticacoes.authenticateJWT, app.api.autenticacoes.verifyToken) 
}