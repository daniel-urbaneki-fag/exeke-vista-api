module.exports = app => {
    app.get('/login', app.api.user.get)
    app.get('/getSolicitacoes',app.api.solicitacoes.getSolicitacoes)
    app.post('/save', app.api.user.save)
    app.post('/createsolicitacao', app.api.solicitacoes.createSolicitacao)
}