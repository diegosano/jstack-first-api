let users = require('../mocks/users');

module.exports = {
  listUsers(request, response) {
    const { order } = request.query;
    const sortedUsers = users.sort((a, b) => {
      if (order === 'desc') {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    });

    response.send(200, sortedUsers);
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return response.send(400, { error: 'User not found' });
    }

    response.send(200, user);
  },

  createUser(request, response) {
    const { body } = request;
    const lastUserId = users[users.length - 1].id;

    const user = {
      id: lastUserId + 1,
      name: body.name,
    };

    users.push(user);

    response.send(200, user);
  },

  updateUser(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const userExist = users.find((user) => user.id === Number(id));

    if (!userExist) {
      return response.send(400, { error: 'User not found' });
    }

    const newUsers = users.map((user) => {
      if (user.id === Number(id)) {
        return {
          ...user,
          name,
        };
      }

      return user;
    });

    users = newUsers;

    response.send(200, { id: Number(id), name });
  },

  deleteUser(request, response) {
    const { id } = request.params;

    const newUsers = users.filter((user) => user.id !== Number(id));
    users = newUsers;

    response.send(200, { success: true });
  },
};
