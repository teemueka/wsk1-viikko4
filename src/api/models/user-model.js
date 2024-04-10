const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 1234,
    name: 'rööki',
    username: 'mallunpunanen',
    email: 'malboro@gold.fi',
    role: 'admin',
    password: 'pass123',
  },
  {
    user_id: 4321,
    name: 'huuhaa',
    username: 'blaablaa',
    email: 'sauna',
    role: 'user',
    password: 'drowssap',
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.cat_id === id);
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = userItems[0].user_id + 1;
  userItems.unshift({user_id: newId, name, username, email, role, password});
  return {user_id: newId};
};

export {listAllUsers, findUserById, addUser};
