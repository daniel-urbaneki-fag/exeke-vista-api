module.exports = app => {
    const get = (req, res) => {
        app.db('pessoa')
            .select('id', 'nome', 'cpf', 'email')
            .then(pessoa => res.json(pessoa))
            .catch(err => res.status(500).send(err))
    }

    const save = async (req, res) => {
        
        if(!req.body.endereco) return res.status(400).send('Informar Endereço')
        if(!req.body.pessoa) return res.status(400).send('Informar Pessoa')
        if(!req.body.usuario) return res.status(400).send('Informar Usuário')
        
        const pessoa = { ...req.body.pessoa }
        const endereco = {...req.body.endereco }
        const usuario = {...req.body.usuario }

        if(!endereco.logradouro || 
            !endereco.numero  || 
            !endereco.complemento ||
            !endereco.bairro ||
            !endereco.cep ||
            !endereco.cidade ||
            !endereco.estado) return res.status(400).send('Endereço incompleto!')
        if(!pessoa.cpf) return res.status(400).send('Informar Cpf!')
        
        const pessoaDb = await app.db('pessoa')
        .where({ cpf: pessoa.cpf })
        .first()

        if(pessoaDb) return res.status(400).send('Já esta cadastrado a pessoa!')

        const usuarioDb = await app.db('usuarios')
        .where({ usuario: usuario.usuario })
        .first()

        if(usuarioDb) return res.status(400).send('Nome de usuário já cadastrado!')

        const isEndereco = await app.db('endereco')
        .where({ cep: endereco.cep })
        .first()

        if(isEndereco) return res.status(400).send('O Cep já esta cadastrado!')

        if(!isEndereco && endereco) {
            endereco.logradouro = endereco.logradouro.charAt(0).toUpperCase() + endereco.logradouro.slice(1)
            endereco.complemento = endereco.complemento.charAt(0).toUpperCase() + endereco.complemento.slice(1)
            endereco.bairro = endereco.bairro.charAt(0).toUpperCase() + endereco.bairro.slice(1)
            endereco.cidade = endereco.cidade.charAt(0).toUpperCase() + endereco.cidade.slice(1)
            endereco.estado = endereco.estado.charAt(0).toUpperCase() + endereco.estado.slice(1)
            await app.db('endereco')
            .insert(endereco)
            .then(_ => res.status(204))
            .catch(err => res.status(500).send(err))
        }

        const idEndereco = await app.db('endereco')
            .select('id')
            .where({ cep: endereco.cep })
            .first()

        if(!pessoa.nome || !pessoa.email) return res.status(400).send('Informar Nome/Email')
        //if(!pessoa.password) return res.status(400).send('Informe uma senha !')
        
        const emailTrue = await app.db('pessoa')
        .where({ email: pessoa.email })
        .first()

        if(emailTrue) return res.status(400).send('Email já esta cadastrado !')

        pessoa.id_endereco = idEndereco.id

        if(!pessoaDb) {
            pessoa.nome = pessoa.nome.charAt(0).toUpperCase() + pessoa.nome.slice(1)
            await app.db('pessoa')
                .insert(pessoa)
                .then(_ => res.status(204))
                .catch(err => res.status(500).send(err))
        }

        const idPessoa = await app.db('pessoa')
            .select('id')
            .where({ cpf: pessoa.cpf })
            .first()
        
        usuario.id_pessoa = idPessoa.id

        if(!usuarioDb) {
            usuario.usuario = usuario.usuario.charAt(0).toUpperCase() + usuario.usuario.slice(1)
            await app.db('usuarios')
                .insert(usuario)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    
    return { get , save }
}