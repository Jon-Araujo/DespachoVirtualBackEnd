import pool from '../config/conection.js';

class MissionsController {
    static listMissions = async (req, res) => {
        pool.query('SELECT * FROM missions', (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao listar missões: ' });
            } else {
                res.status(200).json(result.rows);
            }
        })
    }

    static listMissionsById = async (req, res) => {
        const id = req.params.id;

        pool.query(`SELECT * FROM missions WHERE ID = ${id}`, (error, result) => {
            if (error) {
                res.status(500).json({ error: "Erro ao listar missão" });
            } else {
                res.status(200).json(result.rows);
            }
        })
    }

    static registerMission = async (req, res) => {
        const {remetente, destinatario, titulo, descricao, prazo, patenteremetente, patentedestinatario} = req.body;

        const query = 'INSERT INTO missions (remetente, destinatario, titulo, descricao, prazo, patenteremetente, patentedestinatario) VALUES ($1, $2, $3, $4, $5, $6, $7)';

        try {
            await pool.query(query, [remetente, destinatario, titulo, descricao, prazo, patenteremetente, patentedestinatario]);
            res.status(201).json({ message: "Missão cadastrada com sucesso" });
        } catch(error) {
            res.status(500).json({ error: "Falha ao cadastrar missão"})
        }
    }

    static updateMission = async (req, res) => {
        const id = req.params.id;
        const {remetente, destinatario, titulo, descricao, prazo, patenteremetente, patentedestinatario} = req.body;
        const query = `UPDATE missions SET remetente = $1, destinatario = $2, titulo = $3, descricao = $4, prazo = $5, patenteremetente = $6, patentedestinatario = $7 WHERE id = ${id}`;

        try {
            await pool.query(query, [remetente, destinatario, titulo, descricao, prazo, patenteremetente, patentedestinatario]);
            res.status(202).json({ message: "Dados da missão atualizados com sucesso" })
        } catch(error) {
            res.status(500).json({ error: "Os dados da missão não foram atualizados" })
        }
    }

    static deleteMission = async (req, res) => {
        const id = req.params.id;
        
        try {
            await pool.query(`DELETE FROM missions WHERE id = ${id}`);
            res.status(202).json({ message: "Missão deletada com sucesso" })
        } catch(error) {
            res.status(500).json({ error: "A missão não foi deletada"})
        }
    }
}

export default MissionsController;