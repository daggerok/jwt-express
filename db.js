export let users = []
export const addUser = (username) => {

  if (users.filter((u, i) => u.username === username).length > 0) {
    return users;
  }

  return users = [
    ...users,
    {id: users.length + 1, username}
  ];
}
