import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  setTimeout(next, 500);
});

server.get('/users', (req, res) => {
  try {
    const db = router.db;
    let allUsers = db.get('users').value();

    const filters = { ...req.query };
    const reservedKeys = ['_page', '_limit', '_sort', '_order', 'q'];
    reservedKeys.forEach(key => delete filters[key]);

    let filteredUsers = allUsers.filter(user => {
      for (const key in filters) {
        const filterValue = filters[key];
        
        // Check for the '_like' suffix
        if (key.endsWith('_like')) {
          // Get the actual field name by removing '_like'
          const actualKey = key.slice(0, -5); 
          const userValue = user[actualKey];
          
          // Perform a case-insensitive "contains" search
          if (!String(userValue).toLowerCase().includes(String(filterValue).toLowerCase())) {
            return false;
          }
        } else {
          // This is for exact matches (e.g., ?status=Active)
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
      }
      return true;
    });

    // Full-Text Search (q=)
    const searchTerm = req.query.q;
    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        Object.values(user)
          .join(' ')
          .toLowerCase()
          .includes(String(searchTerm).toLowerCase())
      );
    }

    // Sorting logic
    const sortField = req.query._sort;
    const sortOrder = req.query._order || 'asc';
    if (sortField) {
      filteredUsers.sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (sortField === 'id') {
          valA = parseInt(valA, 10);
          valB = parseInt(valB, 10);
        }
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    const total = filteredUsers.length;

    const page = parseInt(req.query._page || '1', 10);
    const limit = parseInt(req.query._limit || '10', 10);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    res.jsonp({
      data: paginatedUsers,
      total: total,
    });
  } catch (e) {
    console.error("Error in /users handler:", e);
    res.status(500).jsonp({ error: "An internal server error occurred" });
  }
});

server.get('/blogs', (req, res) => {
  try {
    const db = router.db;
    const blogs = db.get('blogs').value();

    res.jsonp({ data: blogs });
  } catch (e) {
    console.error("Error in /blogs handler:", e);
    res.status(500).jsonp({ error: "An internal server error occurred" });
  }
});


server.use(router);

server.listen(3001, () => {
  console.log('JSON Server with custom handler is running at http://localhost:3001');
});