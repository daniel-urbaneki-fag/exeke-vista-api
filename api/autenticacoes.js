const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = app => {
    const login = async (req, res) => {
        if (!req.body.login) return res.status(400).send('Informar login!');

        const loginData = { ...req.body.login };

        if (!loginData.usuario || !loginData.senha) return res.status(400).send('Informar usuário e senha!');

        try {
            const usuarioDb = await app.db('usuarios')
                .where({ usuario: loginData.usuario })
                .first();

            if (!usuarioDb) {
                return res.status(400).send('Usuário não encontrado!');
            }

            const match = await bcrypt.compare(loginData.senha, usuarioDb.senha);

            if (!match) {
                return res.status(400).send('Senha incorreta!');
            }

            const token = jwt.sign({ id: usuarioDb.id, usuario: usuarioDb.usuario }, process.env.SECRET_KEY, { expiresIn: '1h' });

            return res.status(200).json({ message: 'Logado com sucesso!', token });
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            return res.status(500).send(err.message || 'Erro interno');
        }
    };

    const authenticateJWT = (req, res, next) => {
        const authHeader = req.headers.authorization;
    
        if (authHeader) {
            const token = authHeader.split(' ')[1];
    
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
    
                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    };

    return { login, authenticateJWT }
}