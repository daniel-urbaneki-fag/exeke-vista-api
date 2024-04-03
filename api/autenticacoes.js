module.exports = app => {
    const login = async (req, res) => {

        if(!req.body.login) return res.status(400).send('Informar login!')

        const login = {...req.body.login }

        if(!login.usuario || !login.senha) return res.status(400).send('Informar usuário e senha!')

        const usuarioDb = await app.db('usuarios')
            .where({ usuario: login.usuario  })
            .andWhere({ senha: login.senha })
            .first()

        if(!usuarioDb) {
            return res.status(400).send('Usuário e senha incorretos!')
        } else {
            return res.status(200).send('Logado com sucesso!')
        }
    }

    return { login }
}