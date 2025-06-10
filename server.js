import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Simulate network delay
server.use((req, res, next) => {
  setTimeout(next, 500);
});

// --- FORCEFUL OVERRIDE of the /users GET route ---
// We place this BEFORE server.use(router) to ensure it takes precedence.
server.get('/users', (req, res) => {
  try {
    // 1. Get all users from the database
    const db = router.db; // Get a reference to the low-level database
    let allUsers = db.get('users').value();

    // 2. Apply Filters (e.g., ?status=Active, ?role=Admin)
    const filters = { ...req.query };
    // These keys are for special handling, not simple filtering
    const reservedKeys = ['_page', '_limit', '_sort', '_order', 'q'];
    reservedKeys.forEach(key => delete filters[key]);

    let filteredUsers = allUsers.filter(user => {
      for (const key in filters) {
        const filterValue = filters[key];
        const userValue = user[key];

        if (Array.isArray(filterValue)) {
          if (!filterValue.includes(String(userValue))) {
            return false;
          }
        } else {
          if (String(userValue) !== String(filterValue)) {
            return false;
          }
        }
      }
      return true;
    });

    // 3. Apply Full-Text Search (e.g., ?q=Alice)
    const searchTerm = req.query.q;
    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        Object.values(user)
          .join(' ')
          .toLowerCase()
          .includes(String(searchTerm).toLowerCase())
      );
    }

    // 4. Apply Sorting (e.g., ?_sort=fullName&_order=asc)
    const sortField = req.query._sort;
    const sortOrder = req.query._order || 'asc';
    if (sortField) {
      filteredUsers.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // 5. GET THE TOTAL COUNT - This is the crucial step!
    const total = filteredUsers.length;

    // 6. Apply Pagination (e.g., ?_page=1&_limit=10)
    const page = parseInt(req.query._page || '1', 10);
    const limit = parseInt(req.query._limit || '10', 10);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    // 7. Send the final, wrapped response
    res.jsonp({
      data: paginatedUsers,
      total: total,
    });
  } catch (e) {
    console.error("Error in /users handler:", e);
    res.status(500).jsonp({ error: "An internal server error occurred" });
  }
});

// Use the default router for all other routes (POST, PUT, DELETE, etc.)
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server with custom handler is running at http://localhost:3001');
});