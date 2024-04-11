import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  console.log(rows);
  return rows
}

const findUserById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_users WHERE user_id = ?', [id]);
  console.log(rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0]
}

const addUser = async (user) => {
  const {name, username, email, role, password} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, role, password)`;
  const params = [name, username, email, role, password];
  const rows = await promisePool.execute(sql, params);
  console.log(rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {user_id: rows[0].insertId}
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [user, id]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
}

const removeUser = async (id) => {
  const [rows] = await promisePool.execute('DELETE FROM wsk_users WHERE user_id = ?', [id]);
  console.log(rows);
  if (rows.affectedRows === 0) {
    return false;
  } else {
    const [catRows] = await promisePool.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
    console.log(catRows);
  }
  return {message: 'success'};
}

export {listAllUsers, findUserById, addUser, modifyUser, removeUser};
