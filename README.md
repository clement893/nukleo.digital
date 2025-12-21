# MODELE-NEXTJS-FULLSTACK

A production-ready full-stack template with Next.js 16 frontend and FastAPI backend.

## 🎯 Features

### Frontend (Next.js 16)
- ✅ **Next.js 16** avec App Router et Turbopack
- ✅ **React 19** avec Server Components
- ✅ **TypeScript 5** avec configuration stricte
- ✅ **Tailwind CSS 3** pour le styling
- ✅ **Bibliothèque UI complète** (20+ composants ERP)
- ✅ **Hooks réutilisables** (useForm, usePagination, useFilters, usePermissions)
- ✅ **NextAuth.js v5** avec OAuth Google
- ✅ **Middleware** de protection des routes
- ✅ **Gestion d'erreurs** centralisée
- ✅ **Logging structuré**

### Backend (FastAPI)
- ✅ **FastAPI** avec OpenAPI/Swagger auto-généré
- ✅ **Pydantic v2** pour validation des données
- ✅ **SQLAlchemy async** pour ORM
- ✅ **Alembic** pour migrations DB
- ✅ **PostgreSQL** avec support async
- ✅ **JWT authentication** avec refresh tokens
- ✅ **Tests** avec pytest
- ✅ **Logging** avec loguru
- ✅ **Gestion d'erreurs** standardisée

### Types Partagés
- ✅ **Package `@modele/types`** pour types partagés
- ✅ **Génération automatique** TypeScript depuis Pydantic
- ✅ **Synchronisation** frontend/backend automatique

### DevOps & Outils
- ✅ **Turborepo** pour monorepo optimisé
- ✅ **pnpm workspaces** pour gestion des dépendances
- ✅ **GitHub Actions** CI/CD
- ✅ **Pre-commit hooks** avec Husky
- ✅ **Docker & Docker Compose**
- ✅ **Railway** deployment ready
- ✅ **Générateur de code** (composants, pages, API)
- ✅ **Scripts de migration** DB

## 🚀 Quick Start

> 📖 **Guide complet disponible** : [GETTING_STARTED.md](./GETTING_STARTED.md)

### Prerequisites

- **Node.js** 22+ ([télécharger](https://nodejs.org/))
- **pnpm** 9+ (`npm install -g pnpm`)
- **Python** 3.11+ ([télécharger](https://www.python.org/downloads/))
- **PostgreSQL** 14+ ([télécharger](https://www.postgresql.org/download/))
- **Docker & Docker Compose** (optionnel)

### Installation Express

```bash
# 1. Cloner le projet
git clone https://github.com/clement893/MODELE-NEXTJS-FULLSTACK.git
cd MODELE-NEXTJS-FULLSTACK

# 2. Installer les dépendances
pnpm install

# 3. Configurer les variables d'environnement
cp backend/.env.example backend/.env
cp apps/web/.env.example apps/web/.env.local
# Éditer les fichiers .env avec vos valeurs

# 4. Initialiser la base de données
createdb modele_db
cd backend && alembic upgrade head && cd ..

# 5. Démarrer le projet
npm run dev:full
```

**Accès :**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📁 Project Structure

```
MODELE-NEXTJS-FULLSTACK/
├── apps/
│   └── web/                    # Next.js 16 frontend
│       ├── src/
│       │   ├── app/           # Pages and layouts
│       │   ├── components/    # React components
│       │   └── lib/           # Utilities
│       ├── package.json
│       ├── Dockerfile
│       └── railway.json
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── api/               # Endpoints
│   │   ├── models/            # SQLAlchemy models
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── services/          # Business logic
│   │   ├── tasks/             # Celery tasks
│   │   └── main.py
│   ├── tests/
│   ├── requirements.txt
│   ├── Dockerfile
│   └── railway.json
├── packages/                   # Shared code
│   ├── types/
│   ├── schemas/
│   ├── config/
│   └── utils/
├── docker-compose.yml
├── turbo.json
└── package.json
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh token

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update current user
- `GET /api/users/{user_id}` - Get user by ID
- `GET /api/users` - List all users
- `DELETE /api/users/{user_id}` - Delete user

### Resources
- `GET /api/resources` - List resources
- `POST /api/resources` - Create resource
- `GET /api/resources/{resource_id}` - Get resource
- `PUT /api/resources/{resource_id}` - Update resource
- `DELETE /api/resources/{resource_id}` - Delete resource

### Upload
- `POST /api/upload/file` - Upload file
- `GET /api/upload/{file_id}` - Get file
- `DELETE /api/upload/{file_id}` - Delete file

### Health
- `GET /health` - Health check
- `GET /api/health` - API health check

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest
pytest --cov=app --cov-report=html
```

### Frontend Tests

```bash
cd apps/web
npm run test
npm run test:ui
```

## 📦 Deployment

### Railway

1. Push to GitHub:

```bash
git push origin main
```

2. Connect Railway to GitHub repository

3. Set environment variables in Railway dashboard:

**Backend:**
```
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
SECRET_KEY=your-secret-key
FRONTEND_URL=https://your-frontend.railway.app
```

**Frontend:**
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
NEXTAUTH_URL=https://your-frontend.railway.app
NEXTAUTH_SECRET=your-secret-key
```

4. Deploy

### Docker

Build and run locally:

```bash
docker-compose up --build
```

## 🛠️ Development

### Code Quality

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Formatting
npm run format

# All checks
npm run build
```

### Database Migrations

```bash
cd backend

# Create migration
alembic revision --autogenerate -m "Add new table"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

### Celery Tasks

```bash
# Start worker
celery -A app.celery_app worker --loglevel=info

# Monitor tasks
celery -A app.celery_app events
```

## 📚 Documentation

- 📖 [Guide de Démarrage Rapide](./GETTING_STARTED.md) - **Nouveau !**
- 🔍 [Audit du Projet](./PROJECT_AUDIT.md) - Analyse complète
- 🎨 [Documentation Backend](./backend/README.md)
- ⚛️ [Documentation Frontend](./apps/web/README.md)
- 🔐 [Authentification](./apps/web/AUTHENTICATION.md)
- 🔄 [Génération de Types](./scripts/generate/types/README.md)
- 📡 [API Documentation](http://localhost:8000/docs) (Swagger)
- 📘 [ReDoc](http://localhost:8000/redoc)

## 🔐 Security

- JWT authentication
- Password hashing with bcrypt
- CORS protection
- SQL injection prevention (SQLAlchemy)
- Environment variable management
- HTTPS ready

## 📝 Environment Variables

### Backend (.env)

```
ENVIRONMENT=development
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/modele_db
REDIS_URL=redis://localhost:6379/0
FRONTEND_URL=http://localhost:3000
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-in-production
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feat/feature-name`
2. Make changes and commit: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feat/feature-name`
4. Submit a Pull Request

## 📄 License

MIT

## 👨‍💻 Author

Created by [clement893](https://github.com/clement893)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Railway](https://railway.app/)

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Happy coding! 🚀**
