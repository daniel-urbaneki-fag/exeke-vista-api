module.exports = app => {

    const getSolicitacoes = async (req, res) => {
        await app.db("solicitacoes")
            .select('id_usuario', 'id_estrutura', 'data_inicio', 'data_fim')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const createSolicitacao = async (req, res) => {
        const request = { ...req.body }
        if (!request.cliente) return res.status(400).send('Informar o cliente')
        if (!request.tipo_estrutura) return res.status(400).send('Informar o tipo de estrutura')
        if (!request.estrutura) return res.status(400).send('Informar a estrutura')
        if (!request.solicitacao) return res.status(400).send('Informar a solicitacao')
        if (!request.imagens) return res.status(400).send('Informar as imagens')

        const cliente = { ...req.body.cliente }
        const tipo_estrutura = { ...req.body.tipo_estrutura }
        const estrutura = { ...req.body.estrutura }
        const solicitacao = { ...req.body.solicitacao }
        const imagens = { ...req.body.imagens }

        if (!cliente.endereco || !cliente.pessoa) return res.status(400).send('Informar pessoa e endereço')
        if (!solicitacao.id_usuario) return res.status(400).send('Informar o id do usuário')
        if (!imagens[0] || !imagens) return res.status(400).send('Faltando imagens!')

        const pessoa = { ...cliente.pessoa }
        const endereco = { ...cliente.endereco }

        if (!endereco.logradouro ||
            !endereco.numero ||
            !endereco.bairro ||
            !endereco.cep ||
            !endereco.cidade ||
            !endereco.estado) return res.status(400).send('Endereço incompleto!')

        if (!pessoa.nome || !pessoa.email || !pessoa.telefone) return res.status(400).send('Informar Nome/Email/Telefone')
        if (!pessoa.cpf) return res.status(400).send('Informar Cpf!')


        if (!estrutura.tipo_estrutura ||
            !estrutura.area_cobertura ||
            !estrutura.numero_modulos ||
            !estrutura.tipo_telha ||
            !estrutura.idade_aparente ||
            !estrutura.dis_ter) return res.status(400).send('Estrutura incompleta!')

        let idEstrutura = ""

        const usuarioDb = await app.db('usuarios')
            .where({ id: solicitacao.id_usuario })
            .first()

        if (!usuarioDb) return res.status(400).send('Usuário não existe')

        if (estrutura.tipo_estrutura == "concreto") {
            if (!tipo_estrutura.vao_livre ||
                !tipo_estrutura.tirante_central ||
                !tipo_estrutura.agulhamento ||
                !tipo_estrutura.contra_aventamento ||
                !tipo_estrutura.tipo_ter ||
                !tipo_estrutura.tipo_travamento) return res.status(400).send('Estrutura incompleta!')

            await app.db("estruturas_concretos")
                .insert(tipo_estrutura)
                .then((id) => {
                    idEstrutura = id[0]
                })
                .catch(err => res.status(500).send(err))

        } else if (estrutura.tipo_estrutura == "madeira") {
            if (
                !tipo_estrutura.tipo_corte_tes ||
                tipo_estrutura.diametro_tronco_tes === undefined ||
                typeof tipo_estrutura.diametro_tronco_tes !== 'number' ||
                tipo_estrutura.larg_corte_tes === undefined ||
                typeof tipo_estrutura.larg_corte_tes !== 'number' ||
                tipo_estrutura.alt_corte_tes === undefined ||
                typeof tipo_estrutura.alt_corte_tes !== 'number' ||
                tipo_estrutura.alt_tes === undefined ||
                typeof tipo_estrutura.alt_tes !== 'number' ||
                tipo_estrutura.vao_livre_tes === undefined ||
                typeof tipo_estrutura.vao_livre_tes !== 'number' ||
                !tipo_estrutura.forma_chumbamento ||
                tipo_estrutura.dis_pilares === undefined ||
                typeof tipo_estrutura.dis_pilares !== 'number' ||
                tipo_estrutura.larg_corte_ter === undefined ||
                typeof tipo_estrutura.larg_corte_ter !== 'number' ||
                tipo_estrutura.alt_corte_ter === undefined ||
                typeof tipo_estrutura.alt_corte_ter !== 'number'
            ) {
                return res.status(400).send('Estrutura incompleta ou dados incorretos!');
            }

            await app.db("estruturas_madeiras")
                .insert(tipo_estrutura)
                .then((id) => {
                    idEstrutura = id[0]
                })
                .catch(err => res.status(500).send(err))
        } else if (estrutura.tipo_estrutura == "metalica") {
            if (
                !tipo_estrutura.tipo_perfil_tes ||
                tipo_estrutura.espess_perf_tes === undefined ||
                typeof tipo_estrutura.espess_perf_tes !== 'number' ||
                tipo_estrutura.larg_perf_tes === undefined ||
                typeof tipo_estrutura.larg_perf_tes !== 'number' ||
                tipo_estrutura.alt_perf_tes === undefined ||
                typeof tipo_estrutura.alt_perf_tes !== 'number' ||
                tipo_estrutura.alt_tes === undefined ||
                typeof tipo_estrutura.alt_tes !== 'number' ||
                tipo_estrutura.vao_livre_tes === undefined ||
                typeof tipo_estrutura.vao_livre_tes !== 'number' ||
                tipo_estrutura.contra_aventamento === undefined ||
                typeof tipo_estrutura.contra_aventamento !== 'boolean' ||
                tipo_estrutura.agulhamento === undefined ||
                typeof tipo_estrutura.agulhamento !== 'boolean' ||
                tipo_estrutura.dis_pilares === undefined ||
                typeof tipo_estrutura.dis_pilares !== 'number' ||
                tipo_estrutura.perf_enrijecido_ter === undefined ||
                typeof tipo_estrutura.perf_enrijecido_ter !== 'number' ||
                tipo_estrutura.larg_perf_ter === undefined ||
                typeof tipo_estrutura.larg_perf_ter !== 'number' ||
                tipo_estrutura.alt_perf_ter === undefined ||
                typeof tipo_estrutura.alt_perf_ter !== 'number'
            ) {
                return res.status(400).send('Estrutura metálica incompleta ou dados incorretos!');
            }

            await app.db("estruturas_metalicas")
                .insert(tipo_estrutura)
                .then((id) => {
                    idEstrutura = id[0]
                })
                .catch(err => res.status(500).send(err))
        } else {
            return res.status(400).send('Estrutura não existente!')
        }

        estrutura.id_estrutura = idEstrutura

        await app.db("estruturas")
            .insert(estrutura)
            .then((id) => {
                idEstrutura = id[0]
            })
            .catch(err => res.status(500).send(err))

        const fs = require('fs');
        const date = new Date()
        const dataHoraS = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "--" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds()
        const dir = "./imagensSolicitacoes";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        if (fs.existsSync(dir)) {
            if (!fs.existsSync(dataHoraS)) {
                fs.mkdirSync(dir + "/" + dataHoraS);
            }
        }

        function base64_decode(base64str, fileName) {
            var bitmap = new Buffer.from(base64str, 'base64');
            fs.writeFileSync("./imagensSolicitacoes/" + dataHoraS + "/" + fileName + "", bitmap, 'binary', function (err) {
                if (err) {
                    console.log('Conversao com erro');
                }
            });
        }

        const arrayImagens = Object.values(imagens)

        arrayImagens.forEach((imagem) => {
            base64_decode(imagem, new Date().getMilliseconds() + ".jpg")
        })


        solicitacao.id_estrutura = idEstrutura

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        solicitacao.data_inicio = today
        solicitacao.data_fim = null

        await app.db("solicitacoes")
            .insert(solicitacao)
            .then(_ => res.status(200).send("Criado com sucesso!"))
            .catch(err => res.status(500).send(err))

    }

    return { createSolicitacao, getSolicitacoes }
}