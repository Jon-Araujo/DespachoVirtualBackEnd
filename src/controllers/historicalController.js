import pool from '../config/conection.js';

class HistoricalController {
    static listHistorical = (req, res) => {
        pool.query('SELECT * FROM historical', (error, result) => {
            if(error) {
                res.status(500).json({ error: 'Erro ao listar histórico' });
            } else {
                res.status(200).json(result.rows);
            }
        })
    }

    static listHistoricalById = (req, res) => {
        const id = req.params.id;

        pool.query(`SELECT * FROM historical WHERE id = ${id}`, (error, result) => {
            if(error) {
                res.status(500).json({ error: 'Erro ao buscar histórico específico' });
            } else {
                res.status(200).json(result.rows);
            }
        })
    }

    static registerHistorical = async(req, res) => {
        const {remetente, destinatario, titulo, descricao, prazo, solucao, patenteremetente, patentedestinatario} = req.body;
        const query = 'INSERT INTO historical (remetente, destinatario, titulo, descricao, prazo, solucao, patenteremetente, patentedestinatario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';

        try {
            await pool.query(query, [remetente, destinatario, titulo, descricao, prazo, solucao, patenteremetente, patentedestinatario]);
            res.status(201).json({ message: "Histórico acrescido com sucesso"})
        } catch (error) {
            res.status(500).json({ message: "Erro ao acrescentar" })
        }
    }

    static updateHistorical = async(req, res) => {
        const id = req.params.id;
        const {remetente, destinatario, titulo, descricao, prazo, solucao, patenteremetente, patentedestinatario} = req.body;
        const query = `UPDATE historical SET remetente = $1, destinatario = $2, titulo = $2, descricao = $3, prazo = $4, solucao = $5, patenteremetente = $6, patentedestinatario = $7 WHERE id = ${id}`;

        try {
            await pool.query(query, [remetente, destinatario, titulo, descricao, prazo, solucao, patenteremetente, patentedestinatario]);
            res.status(202).json({ message: "Atualizado com sucesso" })
        } catch(error) {
            res.status(500).json({ error: "Falha ao atualizar" })
        }
    }

    static deleteHistorial = async(req, res) => {
        const id = req.params.id;

        try {
            await pool.query(`DELETE FROM historical WHERE id = ${id}`);
            res.status(202).json({ message: "Deletado com sucesso" });
        } catch(error) {
            res.status(500).json({ error: "Erro ao deletar"});
        }
    }
}

export default HistoricalController;