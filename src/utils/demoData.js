// Demo / offline mode
// -------------------
// Hardcoded accounts so the app can be navigated without the backend
// (Express + MySQL) running. When you log in with one of the accounts
// below, all API calls in utils/api.js are served from localStorage
// instead of http://localhost:5000.
//
//   Regular user -> user@demo.com  / demo123
//   Admin        -> admin@demo.com / admin123

export const DEMO_ACCOUNTS = [
  {
    id: 1,
    username: 'demo',
    email: 'user@demo.com',
    password: 'demo123',
    full_name: 'Demo User',
    role: 'user',
    created_at: '2026-01-05T09:00:00.000Z'
  },
  {
    id: 2,
    username: 'admin',
    email: 'admin@demo.com',
    password: 'admin123',
    full_name: 'Admin User',
    role: 'admin',
    created_at: '2026-01-02T09:00:00.000Z'
  }
];

const TOKEN_PREFIX = 'demo-token-';
const STORE_KEY = 'demoData';

// Strip the password before the account is handed to the UI
const publicUser = (account) => {
  const { password, ...rest } = account;
  return rest;
};

export const isDemoToken = (token) =>
  typeof token === 'string' && token.startsWith(TOKEN_PREFIX);

export const isDemoSession = () => isDemoToken(localStorage.getItem('token'));

export const demoTokenFor = (user) => `${TOKEN_PREFIX}${user.id}`;

export const findDemoAccount = (email, password) => {
  const account = DEMO_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === String(email).trim().toLowerCase() && a.password === password
  );
  return account ? publicUser(account) : null;
};

export const demoUserFromToken = (token) => {
  if (!isDemoToken(token)) return null;
  const id = Number(token.slice(TOKEN_PREFIX.length));
  const account = DEMO_ACCOUNTS.find((a) => a.id === id);
  return account ? publicUser(account) : null;
};

const currentDemoUser = () => demoUserFromToken(localStorage.getItem('token'));

// Sample data ---------------------------------------------------------------

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
};

const seedStore = () => ({
  users: [
    ...DEMO_ACCOUNTS.map(publicUser),
    {
      id: 3,
      username: 'sarah_k',
      email: 'sarah@example.com',
      full_name: 'Sarah Khoury',
      role: 'user',
      created_at: '2026-02-11T14:20:00.000Z'
    },
    {
      id: 4,
      username: 'omar_h',
      email: 'omar@example.com',
      full_name: 'Omar Haddad',
      role: 'user',
      created_at: '2026-03-03T10:45:00.000Z'
    },
    {
      id: 5,
      username: 'lina_m',
      email: 'lina@example.com',
      full_name: 'Lina Mansour',
      role: 'user',
      created_at: '2026-04-27T18:05:00.000Z'
    }
  ],
  activities: [
    { id: 1, user_id: 1, name: 'Morning walk', description: '30 minutes around the park', date: daysAgo(0) },
    { id: 2, user_id: 1, name: 'Reading', description: 'Read 20 pages before bed', date: daysAgo(1) },
    { id: 3, user_id: 1, name: 'Meditation', description: '10 minute breathing session', date: daysAgo(2) },
    { id: 4, user_id: 1, name: 'Cycling to work', description: '15 minutes each way', date: daysAgo(4) },
    { id: 5, user_id: 1, name: 'Grocery shopping', description: 'Meal prep for the week', date: daysAgo(6) },
    { id: 6, user_id: 2, name: 'Team stand-up walk', description: 'Walking meeting', date: daysAgo(1) }
  ],
  meals: [
    { id: 1, user_id: 1, name: 'Oatmeal with berries', type: 'Breakfast', calories: 320, date: daysAgo(0) },
    { id: 2, user_id: 1, name: 'Chicken salad', type: 'Lunch', calories: 540, date: daysAgo(0) },
    { id: 3, user_id: 1, name: 'Grilled salmon & rice', type: 'Dinner', calories: 680, date: daysAgo(1) },
    { id: 4, user_id: 1, name: 'Greek yogurt', type: 'Snack', calories: 150, date: daysAgo(2) },
    { id: 5, user_id: 1, name: 'Veggie omelette', type: 'Breakfast', calories: 380, date: daysAgo(3) },
    { id: 6, user_id: 1, name: 'Pasta primavera', type: 'Dinner', calories: 720, date: daysAgo(5) },
    { id: 7, user_id: 2, name: 'Protein shake', type: 'Snack', calories: 220, date: daysAgo(1) }
  ],
  exercises: [
    { id: 1, user_id: 1, name: 'Running', type: 'Cardio', duration: 35, date: daysAgo(0) },
    { id: 2, user_id: 1, name: 'Upper body weights', type: 'Strength', duration: 45, date: daysAgo(2) },
    { id: 3, user_id: 1, name: 'Yoga', type: 'Flexibility', duration: 30, date: daysAgo(3) },
    { id: 4, user_id: 1, name: 'Football with friends', type: 'Sports', duration: 60, date: daysAgo(5) },
    { id: 5, user_id: 2, name: 'Swimming', type: 'Cardio', duration: 40, date: daysAgo(2) }
  ]
});

const loadStore = () => {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (error) {
    console.error('Demo store is corrupted, reseeding:', error);
  }
  const fresh = seedStore();
  localStorage.setItem(STORE_KEY, JSON.stringify(fresh));
  return fresh;
};

const saveStore = (store) => localStorage.setItem(STORE_KEY, JSON.stringify(store));

export const resetDemoData = () => localStorage.removeItem(STORE_KEY);

// Generic CRUD over one collection, scoped to the logged-in demo user -------

const nextId = (items) => items.reduce((max, item) => Math.max(max, item.id), 0) + 1;

const list = (collection) => {
  const user = currentDemoUser();
  if (!user) return { success: false, message: 'Not authenticated' };
  const items = loadStore()[collection]
    .filter((item) => item.user_id === user.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return { success: true, [collection]: items };
};

// `singular` matches the key the real controllers return on create
// (e.g. { success: true, activity: {...} }).
const create = (collection, singular, data) => {
  const user = currentDemoUser();
  if (!user) return { success: false, message: 'Not authenticated' };
  const store = loadStore();
  const item = {
    id: nextId(store[collection]),
    user_id: user.id,
    ...data,
    created_at: new Date().toISOString()
  };
  store[collection].push(item);
  saveStore(store);
  return { success: true, message: `${singular} created successfully`, [singular]: item };
};

const update = (collection, singular, id, data) => {
  const user = currentDemoUser();
  if (!user) return { success: false, message: 'Not authenticated' };
  const store = loadStore();
  const item = store[collection].find((i) => i.id === Number(id) && i.user_id === user.id);
  if (!item) return { success: false, message: `${singular} not found` };
  Object.assign(item, data);
  saveStore(store);
  return { success: true, message: `${singular} updated successfully`, [singular]: item };
};

const remove = (collection, singular, id) => {
  const user = currentDemoUser();
  if (!user) return { success: false, message: 'Not authenticated' };
  const store = loadStore();
  const before = store[collection].length;
  store[collection] = store[collection].filter(
    (i) => !(i.id === Number(id) && i.user_id === user.id)
  );
  if (store[collection].length === before) return { success: false, message: `${singular} not found` };
  saveStore(store);
  return { success: true, message: `${singular} deleted successfully` };
};

const crudFor = (collection, singular) => ({
  getAll: () => list(collection),
  create: (data) => create(collection, singular, data),
  update: (id, data) => update(collection, singular, id, data),
  delete: (id) => remove(collection, singular, id)
});

// Same surface as the real API in utils/api.js -------------------------------

export const demoAPI = {
  auth: {
    login: (email, password) => {
      const user = findDemoAccount(email, password);
      if (!user) return { success: false, message: 'Invalid email or password' };
      return { success: true, message: 'Login successful', token: demoTokenFor(user), user };
    },
    getProfile: () => {
      const user = currentDemoUser();
      return user ? { success: true, user } : { success: false, message: 'Not authenticated' };
    }
  },

  activities: crudFor('activities', 'activity'),
  meals: crudFor('meals', 'meal'),
  exercises: crudFor('exercises', 'exercise'),

  admin: {
    getAllUsers: () => {
      const user = currentDemoUser();
      if (user?.role !== 'admin') return { success: false, message: 'Admin access required' };
      return { success: true, users: loadStore().users };
    },

    getStats: () => {
      const user = currentDemoUser();
      if (user?.role !== 'admin') return { success: false, message: 'Admin access required' };
      const store = loadStore();
      return {
        success: true,
        stats: {
          totalUsers: store.users.length,
          totalActivities: store.activities.length,
          totalMeals: store.meals.length,
          totalExercises: store.exercises.length,
          recentUsers: [...store.users]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5)
        }
      };
    },

    deleteUser: (id) => {
      const user = currentDemoUser();
      if (user?.role !== 'admin') return { success: false, message: 'Admin access required' };
      if (Number(id) === user.id) return { success: false, message: 'You cannot delete your own account' };
      if (DEMO_ACCOUNTS.some((a) => a.id === Number(id))) {
        return { success: false, message: 'Demo accounts cannot be deleted' };
      }
      const store = loadStore();
      store.users = store.users.filter((u) => u.id !== Number(id));
      ['activities', 'meals', 'exercises'].forEach((c) => {
        store[c] = store[c].filter((i) => i.user_id !== Number(id));
      });
      saveStore(store);
      return { success: true, message: 'User deleted' };
    },

    updateUserRole: (id, role) => {
      const user = currentDemoUser();
      if (user?.role !== 'admin') return { success: false, message: 'Admin access required' };
      if (DEMO_ACCOUNTS.some((a) => a.id === Number(id))) {
        return { success: false, message: 'Demo account roles are fixed' };
      }
      const store = loadStore();
      const target = store.users.find((u) => u.id === Number(id));
      if (!target) return { success: false, message: 'User not found' };
      target.role = role;
      saveStore(store);
      return { success: true, message: 'Role updated' };
    }
  }
};
