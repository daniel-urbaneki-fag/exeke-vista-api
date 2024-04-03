module.exports = app => {
    const create = async (req, res) => {

        if(!req.body.endereco) return res.status(400).send('Informar Endereço')
        if(!req.body.empresa) return res.status(400).send('Informar dados da empresa!')

        const endereco = {...req.body.endereco }
        const empresa = { ...req.body.empresa }

        if(!endereco.logradouro || 
            !endereco.numero  || 
            !endereco.complemento ||
            !endereco.bairro ||
            !endereco.cep ||
            !endereco.cidade ||
            !endereco.estado) return res.status(400).send('Endereço incompleto!')

        if(!empresa.nome_fantasia  || 
            !empresa.razao_social ||
            !empresa.telefone ||
            !empresa.email ||
            !empresa.cnpj ||
            !empresa.tipo) return res.status(400).send('Endereço incompleto!')
        
        const empresaDb = await app.db('empresas')
            .where({ cnpj: empresa.cnpj })
            .first()
    
        if(empresaDb) return res.status(400).send('Já esta cadastrado a empresa!')


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
        
        empresa.id_endereco = idEndereco.id

        if(!empresaDb) {
            empresa.nome_fantasia = empresa.nome_fantasia.charAt(0).toUpperCase() + empresa.nome_fantasia.slice(1)
            await app.db('empresas')
                .insert(empresa)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    return { create }
}