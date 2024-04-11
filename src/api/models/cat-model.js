import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const sql = 'SELECT wsk_cats.*, wsk_users.name AS owner_name FROM wsk_cats JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id;'
  const [rows] = await promisePool.query(sql);
  console.log('rows', rows);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE cat_id = ?', [id]);
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {cat_id: rows[0].insertId};
};

const modifyCat = async (cat, id) => {
  const sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [cat, id]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeCat = async (id) => {
  const [rows] = await promisePool.execute('DELETE FROM wsk_cats WHERE cat_id = ?', [id]);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const getCatsByUserId = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE owner = ?', [id]);
  console.log(rows);
  if (rows.length === 0) {
    return false;
  }
  return rows;
}

export {listAllCats, findCatById, addCat, modifyCat, removeCat, getCatsByUserId};
