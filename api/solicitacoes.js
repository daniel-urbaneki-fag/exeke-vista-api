module.exports = app => {

    const createSolicitacao = async (req, res) => {
        const request = { ...req.body }
        if(!request.usuario) return res.status(400).send('Informar o nome do usuário')

        const usuarioDb = await app.db('usuarios')
        .where({ usuario: request.usuario })
        .first()
    }

    return {createSolicitacao}
}