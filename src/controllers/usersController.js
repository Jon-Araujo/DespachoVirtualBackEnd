import pool from '../config/conection.js';

class UsersController {

    static listUsers = async (req, res) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao buscar usuários' });
            } else {
                res.status(200).json(result.rows);
            }
        })
    }

    static listUserById = async (req, res) => {
        const id = req.params.id;
        pool.query(`SELECT * FROM users WHERE id = ${id}`, (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao buscar usuário' });
            } else {
                res.status(200).json(result.rows);
            }
        })
    }

    static registerUser = async (req, res) => {
        const { patente, nome, senha, email, pergunta, resposta } = req.body;

        const query = 'INSERT INTO users (patente, nome, senha, email, pergunta, resposta) VALUES ($1, $2, $3, $4, $5, $6)';
        try {
            await pool.query(query, [patente, nome, senha, email, pergunta, resposta]);
            res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        } catch (error) {
            console.error('Erro ao cadastrar usuário: ', error);
            res.status(500).json({ error: "Falha ao cadastrar usuário" });
        }
    }

    static updateUser = async (req, res) => {
        const id = req.params.id;
        const { patente, nome, senha, email, pergunta, resposta } = req.body;
        try {
            await pool.query(`UPDATE users SET patente = $1, nome = $2, senha = $3, email = $4, pergunta = $5, resposta = $6 WHERE id = ${id}`, [patente, nome, senha, email, pergunta, resposta]);
            res.status(201).json({ message: 'Usuário atualizado com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar dados: ', error);
            res.status(500).json({ error: "Falha ao cadastrar usuário" });
        }
    }

    static deleteUser = async (req, res) => {
        const id = req.params.id;

        pool.query(`DELETE FROM users WHERE id = ${id}`, (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Erro ao deletar usuário' });
            } else {
                res.status(200).send({ message: 'Usuário excluído com sucesso!' });
            }
        })  
        
    }
}

export default UsersController