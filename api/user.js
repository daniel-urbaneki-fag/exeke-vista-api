const bcrypt = require('bcrypt');

module.exports = app => {
    const create = async (req, res) => {
        
        if(!req.body.endereco) return res.status(400).send('Informar Endereço')
        if(!req.body.pessoa) return res.status(400).send('Informar Pessoa')
        if(!req.body.usuario) return res.status(400).send('Informar Usuário')
        
        const pessoa = { ...req.body.pessoa }
        const endereco = {...req.body.endereco }
        const usuario = {...req.body.usuario }

        if(!endereco.logradouro || 
            !endereco.numero ||
            !endereco.bairro ||
            !endereco.cep ||
            !endereco.cidade ||
            !endereco.estado) return res.status(400).send('Endereço incompleto!')
        
        if(!pessoa.nome || !pessoa.email || !pessoa.telefone) return res.status(400).send('Informar Nome/Email/Telefone')
        if(!pessoa.cpf) return res.status(400).send('Informar Cpf!')

        if(!usuario.usuario || !usuario.senha || !usuario.funcao || !usuario.id_empresa) return res.status(400).send("Informe dados de usuário")
        
        const pessoaDb = await app.db('pessoas')
        .where({ cpf: pessoa.cpf })
        .first()

        if(pessoaDb) return res.status(400).send('Já esta cadastrado a pessoa!')

        const usuarioDb = await app.db('usuarios')
        .where({ usuario: usuario.usuario })
        .first()

        if(usuarioDb) return res.status(400).send('Nome de usuário já cadastrado!')

        const emailTrue = await app.db('pessoas')
        .where({ email: pessoa.email })
        .first()

        if(emailTrue) return res.status(400).send('Email já esta cadastrado !')

        let idEndereco = await app.db('enderecos')
            .select('id')
            .where({ cep: endereco.cep  })
            .andWhere({ numero: endereco.numero })
            .first()
        
        if(!idEndereco) {
            endereco.logradouro = endereco.logradouro.charAt(0).toUpperCase() + endereco.logradouro.slice(1)
            endereco.complemento = endereco.complemento.charAt(0).toUpperCase() + endereco.complemento.slice(1)
            endereco.bairro = endereco.bairro.charAt(0).toUpperCase() + endereco.bairro.slice(1)
            endereco.cidade = endereco.cidade.charAt(0).toUpperCase() + endereco.cidade.slice(1)
            endereco.estado = endereco.estado.charAt(0).toUpperCase() + endereco.estado.slice(1)
            await app.db('enderecos')
            .insert(endereco)
            .then(_ => res.status(204))
            .catch(err => res.status(500).send(err))
            
            idEndereco = await app.db('enderecos')
            .select('id')
            .where({ cep: endereco.cep  })
            .andWhere({ numero: endereco.numero })
            .first()
        }
        
        pessoa.id_endereco = idEndereco.id

        if(!pessoaDb) {
            pessoa.nome = pessoa.nome.charAt(0).toUpperCase() + pessoa.nome.slice(1)
            await app.db('pessoas')
                .insert(pessoa)
                .then(_ => res.status(204))
                .catch(err => res.status(500).send(err))
        }

        const idPessoa = await app.db('pessoas')
            .select('id')
            .where({ cpf: pessoa.cpf })
            .first()
        
        usuario.id_pessoa = idPessoa.id

        if(!usuarioDb) {
            usuario.usuario = usuario.usuario.charAt(0).toUpperCase() + usuario.usuario.slice(1)
            const hashedPassword = await bcrypt.hash(usuario.senha, 10);
            

            await app.db('usuarios')
                .insert({
                    ...usuario,
                    senha: hashedPassword
                })
                .then(_ => res.status(200).send('Usuário cadastrado com sucesso!'))
                .catch(err => res.status(500).send(err))
        }
    }
    
    return { create }
}