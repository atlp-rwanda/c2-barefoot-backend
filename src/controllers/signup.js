// Signup page controller
import bcrypt from 'bcrypt';
import pool from '../config/config';

const signup = async (req, res) => {
  let {
    // eslint-disable-next-line prefer-const
    firstName, lastName, email, password, password2
  } = req.body;

  if (password !== password2) {
    res.status(400).json({ message: "Passwords don't match" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query('SELECT * FROM users WHERE email =$1', [email], (err, result) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      if (result.rows.length > 0) {
        res.status(400).json({ message: 'Account already exists' });
      } else {
        pool.query(
          `INSERT into users (first_name, last_name, email, password) 
          VALUES ($1, $2, $3, $4)
          RETURNING id, first_name, last_name`, [firstName, lastName, email, hashedPassword], (err, results) => {
            if (err) {
              return res.status(400).json({ message: err });
            }
            res.status(200).json({ user: results.rows });
          }
        );
      }
    });
  }
};

export default signup;
