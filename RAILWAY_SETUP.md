# Railway Deployment Setup Guide

This guide will help you deploy both the frontend and backend to Railway.

## Prerequisites

- Railway account ([railway.app](https://railway.app))
- GitHub repository connected to Railway
- Railway CLI installed (optional): `npm i -g @railway/cli`

## Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository
5. Railway will create a new project

## Step 2: Create Frontend Service

1. In your Railway project, click **"New"**
2. Select **"GitHub Repo"**
3. Choose your repository
4. Configure the service:
   - **Root Directory**: `apps/web`
   - **Build Command**: Railway will auto-detect (uses `nixpacks.toml` or `railway.json`)
   - **Start Command**: Railway will auto-detect

5. **Get Service ID**:
   - Click on the service
   - Go to **Settings** → **General**
   - Copy the **Service ID** (you'll need this for GitHub Actions)

6. **Set Environment Variables**:
   - Go to **Variables** tab
   - Add the following:
     ```
     NODE_ENV=production
     PORT=3000
     NEXT_PUBLIC_API_URL=https://your-backend-service.railway.app
     NEXT_PUBLIC_APP_URL=https://your-frontend-service.railway.app
     ```

## Step 3: Create Backend Service

1. In your Railway project, click **"New"**
2. Select **"GitHub Repo"**
3. Choose your repository
4. Configure the service:
   - **Root Directory**: `backend`
   - **Build Command**: Railway will auto-detect
   - **Start Command**: Railway will auto-detect (uses `uvicorn app.main:app`)

5. **Get Service ID**:
   - Click on the service
   - Go to **Settings** → **General**
   - Copy the **Service ID**

6. **Add PostgreSQL Database**:
   - Click **"New"** → **"Database"** → **"Add PostgreSQL"**
   - Railway will automatically create a database
   - The `DATABASE_URL` will be automatically set as an environment variable

7. **Set Environment Variables**:
   - Go to **Variables** tab
   - Add the following:
     ```
     ENVIRONMENT=production
     SECRET_KEY=your-secret-key-here
     DATABASE_URL=<auto-set-by-railway>
     CORS_ORIGINS=https://your-frontend-service.railway.app
     ```
   - Add other backend environment variables as needed

## Step 4: Configure GitHub Actions

1. **Get Railway Token**:
   - Go to Railway dashboard
   - Click your profile → **Account Settings**
   - Go to **Tokens** tab
   - Click **"New Token"**
   - Copy the token

2. **Add GitHub Secrets**:
   - Go to your GitHub repository
   - Navigate to **Settings** → **Secrets and variables** → **Actions**
   - Add the following secrets:
     - `RAILWAY_TOKEN`: Your Railway API token
     - `RAILWAY_FRONTEND_SERVICE_ID`: Frontend service ID
     - `RAILWAY_BACKEND_SERVICE_ID`: Backend service ID

3. **For Staging Environment** (optional):
   - Create duplicate services in Railway for staging
   - Add these secrets:
     - `RAILWAY_FRONTEND_STAGING_SERVICE_ID`
     - `RAILWAY_BACKEND_STAGING_SERVICE_ID`

## Step 5: Configure Domains (Optional)

1. **Frontend Domain**:
   - Go to frontend service → **Settings** → **Networking**
   - Click **"Generate Domain"** or add custom domain
   - Copy the domain URL

2. **Backend Domain**:
   - Go to backend service → **Settings** → **Networking**
   - Click **"Generate Domain"** or add custom domain
   - Copy the domain URL

3. **Update Environment Variables**:
   - Update `NEXT_PUBLIC_API_URL` in frontend service with backend domain
   - Update `CORS_ORIGINS` in backend service with frontend domain

## Step 6: Deploy

### Automatic Deployment

Once configured, deployments happen automatically:
- **Production**: Push to `main` branch → Deploys both services
- **Staging**: Push to `develop` branch → Deploys both services

### Manual Deployment

1. Go to Railway dashboard
2. Click on the service you want to deploy
3. Click **"Deploy"** → **"Redeploy"**

## Configuration Files

The project includes Railway configuration files:

### Frontend (`apps/web/railway.json`)
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd ../.. && pnpm install --frozen-lockfile && pnpm build:web"
  },
  "deploy": {
    "startCommand": "cd apps/web && pnpm start"
  }
}
```

### Backend (`backend/railway.json`)
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "pip install -r requirements.txt"
  },
  "deploy": {
    "startCommand": "uvicorn app.main:app --host 0.0.0.0 --port $PORT"
  }
}
```

## Troubleshooting

### Build Fails

1. **Check Build Logs**:
   - Go to Railway dashboard → Service → **Deployments**
   - Click on failed deployment → View logs

2. **Common Issues**:
   - Missing environment variables
   - Incorrect root directory
   - Build command errors
   - Dependency installation failures

### Service Won't Start

1. **Check Start Command**:
   - Verify the start command in `railway.json` or service settings
   - Ensure the command matches your `package.json` scripts

2. **Check Port**:
   - Railway sets `PORT` environment variable automatically
   - Ensure your app uses `process.env.PORT` (Node.js) or `$PORT` (Python)

### Database Connection Issues

1. **Verify DATABASE_URL**:
   - Check that PostgreSQL service is created
   - Verify `DATABASE_URL` is set in backend service variables

2. **Check Database Status**:
   - Go to PostgreSQL service → Check if it's running
   - Verify connection string format

### Frontend Can't Connect to Backend

1. **Check CORS Settings**:
   - Verify `CORS_ORIGINS` includes frontend URL
   - Check backend CORS middleware configuration

2. **Verify API URL**:
   - Check `NEXT_PUBLIC_API_URL` in frontend environment variables
   - Ensure it matches backend service URL

## Environment Variables Reference

For a complete list of all environment variables, see [`RAILWAY_ENV_VARIABLES.md`](./RAILWAY_ENV_VARIABLES.md).

### Frontend Service (Required)

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `3000` (auto-set by Railway) |
| `NEXTAUTH_SECRET` | NextAuth secret key | Generated secret |
| `NEXTAUTH_URL` | Frontend URL | `https://frontend.railway.app` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | From Google Console |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | From Google Console |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://backend.railway.app` |
| `FRONTEND_URL` | Frontend URL | `https://frontend.railway.app` |

### Backend Service (Required)

| Variable | Description | Example |
|----------|-------------|---------|
| `ENVIRONMENT` | Environment | `production` |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://...` (auto-set) |
| `SECRET_KEY` | Secret key for JWT | Generated secret |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration | `30` |
| `REFRESH_TOKEN_EXPIRE_DAYS` | Refresh token expiration | `7` |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `BASE_URL` | Backend URL | `https://backend.railway.app` |
| `CORS_ORIGINS` | Allowed origins | `https://frontend.railway.app` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | From Google Console |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | From Google Console |
| `GOOGLE_REDIRECT_URI` | OAuth callback URL | `https://backend.railway.app/api/v1/auth/google/callback` |
| `AWS_ACCESS_KEY_ID` | AWS access key | From AWS Console |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | From AWS Console |
| `AWS_REGION` | AWS region | `us-east-2` |
| `AWS_S3_BUCKET` | S3 bucket name | Your bucket name |
| `OPENAI_API_KEY` | OpenAI API key | From OpenAI |
| `SENDGRID_API_KEY` | SendGrid API key | From SendGrid |
| `SENDGRID_FROM_EMAIL` | Email sender | `hello@yourdomain.com` |
| `SENDGRID_FROM_NAME` | Email sender name | `Your App Name` |
| `FROM_EMAIL` | Default from email | `hello@yourdomain.com` |
| `FROM_NAME` | Default from name | `Your App Name` |
| `BOOTSTRAP_SUPERADMIN_KEY` | Superadmin bootstrap key | Generated secret |
| `PORT` | Server port | `8000` (auto-set by Railway) |

### Optional Variables

| Variable | Description | When Needed |
|----------|-------------|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret key | If using payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | If using webhooks |

## Monitoring

1. **View Logs**:
   - Go to service → **Deployments** → Click deployment → **View Logs**

2. **Metrics**:
   - Railway provides CPU, memory, and network metrics
   - View in service dashboard

3. **Alerts**:
   - Set up alerts in Railway dashboard
   - Configure notifications for deployment failures

## Best Practices

1. ✅ **Use Environment Variables**: Never hardcode secrets
2. ✅ **Separate Staging/Production**: Use different services for each environment
3. ✅ **Monitor Logs**: Regularly check deployment and runtime logs
4. ✅ **Test Locally**: Test builds locally before deploying
5. ✅ **Use Railway CLI**: For advanced operations and debugging

## Support

- [Railway Documentation](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [GitHub Issues](https://github.com/railwayapp/railway/issues)

