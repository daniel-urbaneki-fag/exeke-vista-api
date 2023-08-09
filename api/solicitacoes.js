module.exports = app => {

    const createSolicitacao = async (req, res) => {
        const request = { ...req.body }
        if(!request.tipo_estrutura) return res.status(400).send('Informar o tipo de estrutura')
        if(!request.estrutura) return res.status(400).send('Informar a estrutura')
        if(!request.solicitacao) return res.status(400).send('Informar a solicitacao')
        if(!request.imagens) return res.status(400).send('Informar as imagens')
        
        const tipo_estrutura = {...req.body.tipo_estrutura }
        const estrutura = {...req.body.estrutura }
        const solicitacao = {...req.body.solicitacao }
        const imagens = {...req.body.imagens }
        
        if(!solicitacao.id_usuario) return res.status(400).send('Informar o id do usuário')
        
        if(!estrutura.tipo_estrutura || 
            !estrutura.area_cobertura  || 
            !estrutura.numero_modulos ||
            !estrutura.tipo_telha ||
            !estrutura.idade_aparente ||
            !estrutura.dis_ter) return res.status(400).send('Estrutura incompleta!')
        
        let idEstrutura = ""
        
        if(estrutura.tipo_estrutura == "concreto") {
            if(!tipo_estrutura.vao_livre || 
                !tipo_estrutura.tirante_central  || 
                !tipo_estrutura.agulhamento ||
                !tipo_estrutura.contra_aventamento ||
                !tipo_estrutura.tipo_ter ||
                !tipo_estrutura.tipo_travamento) return res.status(400).send('Estrutura incompleta!')
            
                await app.db("estrutura_concreto")
                    .insert(tipo_estrutura)
                    .then((id) => {
                        idEstrutura = id[0]
                    })
                    .catch(err => res.status(500).send(err))
                
        }

        estrutura.id_estrutura = idEstrutura
        
        await app.db("estrutura")
                .insert(estrutura)
                .then((id) => {
                    idEstrutura = id[0]
                })
                .catch(err => res.status(500).send(err))

        const usuarioDb = await app.db('usuarios')
        .where({ id: solicitacao.id_usuario })
        .first()

        if(!usuarioDb) return res.status(400).send('Usuário não existe')

        solicitacao.id_estrutura = idEstrutura

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        solicitacao.data_inicio = today
        solicitacao.data_fim = null

        await app.db("solicitacoes")
            .insert(solicitacao)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))

    }

    return {createSolicitacao}
}