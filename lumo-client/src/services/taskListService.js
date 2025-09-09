import { http } from "../api/http.js";

/**
 * Create a new task in the system.
 *
 * Sends a POST request to the backend API (`/api/v1/tasks`)
 * with the user JWT token and provided task data.
 *
 * @async
 * @function createTask
 * @param {Object} params - Task data.
 * @param {string} params.title - Task title.
 * @param {string} params.description - Task description.
 * @param {string} params.status - Task status: "unassigned", "ongoing", "completed".
 * @param {string} params.dueDate - Task due date in ISO 8601 format.
 * @param {string} token - JWT token for authorization.
 * @returns {Promise<Object>} The created task object returned by the API.
 * @throws {Error} If the API responds with an error status or message.
 */
export async function createTask(
  { title, description, status, dueDate, list },
  token,
  user,
) {
  return http.post(
    "/api/v1/tasks",
    {
      title,
      description,
      status,
      dueDate,
      user,
      list,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

/**
 * Create a new list in the system.
 *
 * Sends a POST request to the backend API (`/api/v1/lists`)
 * with the user JWT token and provided list data.
 *
 * @async
 * @function createList
 * @param {Object} params - Task data to be created.
 * @param {string} params.title - Title of the task.
 * @param {string} token - JWT token for authorization.
 * @returns {Promise<Object>} The created task object returned by the API.
 * @throws {Error} If the API responds with an error status or message.
 */
export async function createList({ title }, token, userId) {
  return http.post(
    "/api/v1/lists",
    {
      title,
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

/**
 * Get the user associated lists.
 *
 * Sends a GET request to the backend API (`/api/v1/lists`)
 * with the user JWT token and id.
 *
 * @async
 * @function createList
 * @param {Object} params - Task data to be created.
 * @param {string} token - JWT token for authorization.
 * @param {string} userId - The user's id.
 * @returns {Promise<Object>} The created task object returned by the API.
 * @throws {Error} If the API responds with an error status or message.
 */
export async function getUserLists(token, userId) {
  return http.get(`/api/v1/lists/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Get the user associated lists.
 *
 * Sends a GET request to the backend API (`/api/v1/lists`)
 * with the user JWT token and id.
 *
 * @async
 * @function createList
 * @param {Object} params - Task data to be created.
 * @param {string} token - JWT token for authorization.
 * @param {string} userId - The user's id.
 * @returns {Promise<Object>} The created task object returned by the API.
 * @throws {Error} If the API responds with an error status or message.
 */
export async function getListTasks(listId, token) {
  return http.get(`/api/v1/lists/list_tasks/${listId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function loginUser({ email, password }) {
  return http.post("/api/v1/users/login", {
    email,
    password,
  });
}

export async function getUserProfileInfo({ email }) {
  return http.get("no sé", {
    email,
  });
}
