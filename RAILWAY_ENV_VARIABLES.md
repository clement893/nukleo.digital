# Railway Environment Variables Reference

This document lists all environment variables required for deployment on Railway.

## Backend Service Variables

### Authentication & Security
```bash
ACCESS_TOKEN_EXPIRE_MINUTES=30
ALGORITHM=HS256
ENVIRONMENT=production
SECRET_KEY=your-secret-key-here
REFRESH_TOKEN_EXPIRE_DAYS=7
BOOTSTRAP_SUPERADMIN_KEY=your-bootstrap-key-here
```

### Database
```bash
DATABASE_URL=postgresql://user:password@host:port/database
# Note: Railway automatically provides this when you add PostgreSQL service
```

### Google OAuth
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=https://your-backend-url.railway.app/api/v1/auth/google/callback
```

### AWS S3
```bash
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-2
AWS_S3_BUCKET=your-bucket-name
```

### OpenAI
```bash
OPENAI_API_KEY=your-openai-api-key
```

### SendGrid Email
```bash
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=hello@yourdomain.com
SENDGRID_FROM_NAME=Your App Name
FROM_EMAIL=hello@yourdomain.com
FROM_NAME=Your App Name
```

### Stripe (Optional)
```bash
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

### Application URLs
```bash
BASE_URL=https://your-backend-url.railway.app
CORS_ORIGINS=https://your-frontend-url.railway.app
```

## Frontend Service Variables

### NextAuth
```bash
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=https://your-frontend-url.railway.app
```

### Google OAuth
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### API Configuration
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
FRONTEND_URL=https://your-frontend-url.railway.app
```

## Setting Variables in Railway

### Method 1: Railway Dashboard

1. Go to your Railway project
2. Click on the service (frontend or backend)
3. Go to **Variables** tab
4. Click **"New Variable"**
5. Add variable name and value
6. Click **"Add"**

### Method 2: Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Set variables
railway variables set VARIABLE_NAME=value

# Set multiple variables from file
railway variables < .env.backend
```

### Method 3: GitHub Actions (Automated)

Variables are set automatically via GitHub Actions workflows when deploying.

## Production Variables (Current Setup)

### Backend Service
- **Service URL**: `https://your-backend-service.railway.app`
- All backend variables are configured in Railway dashboard
- ⚠️ **Never commit production URLs or secrets to Git**

### Frontend Service
- **Service URL**: `https://your-frontend-service.railway.app`
- All frontend variables are configured in Railway dashboard
- ⚠️ **Never commit production URLs or secrets to Git**

## Security Notes

⚠️ **Important Security Practices:**

1. **Never commit secrets to Git**: Use Railway variables or GitHub Secrets
2. **Rotate secrets regularly**: Especially `SECRET_KEY`, `NEXTAUTH_SECRET`, and API keys
3. **Use different secrets for staging/production**: Never reuse production secrets
4. **Limit access**: Only give Railway access to team members who need it
5. **Monitor usage**: Check Railway logs regularly for suspicious activity

## Environment-Specific Variables

### Production
- Use production URLs for `BASE_URL`, `NEXTAUTH_URL`, `FRONTEND_URL`
- Use production API keys and secrets
- Set `ENVIRONMENT=production`

### Staging
- Use staging URLs
- Use staging/test API keys
- Set `ENVIRONMENT=staging`

## Variable Dependencies

### Backend → Frontend
- `CORS_ORIGINS` must include frontend URL
- `GOOGLE_REDIRECT_URI` must match backend URL
- `BASE_URL` must match backend service URL

### Frontend → Backend
- `NEXT_PUBLIC_API_URL` must match backend service URL
- `FRONTEND_URL` must match frontend service URL
- `NEXTAUTH_URL` must match frontend service URL

## Troubleshooting

### Variables Not Loading

1. **Check Railway Dashboard**: Verify variables are set correctly
2. **Check Service Restart**: Variables require service restart to take effect
3. **Check Variable Names**: Ensure exact match (case-sensitive)
4. **Check Quotes**: Remove quotes from values in Railway dashboard

### CORS Errors

- Ensure `CORS_ORIGINS` includes frontend URL
- Check that URLs match exactly (including `https://`)
- Verify no trailing slashes

### Database Connection Issues

- Verify `DATABASE_URL` is set (Railway auto-sets this)
- Check PostgreSQL service is running
- Verify database credentials

### OAuth Issues

- Verify `GOOGLE_REDIRECT_URI` matches backend URL exactly
- Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Ensure redirect URI is whitelisted in Google Console

## Generating Secrets

### SECRET_KEY (Backend)
```bash
# Generate a secure random key
openssl rand -hex 32
```

### NEXTAUTH_SECRET (Frontend)
```bash
# Generate a secure random key
openssl rand -base64 32
```

### BOOTSTRAP_SUPERADMIN_KEY
```bash
# Generate a secure random key
openssl rand -hex 16
```

## Updating Variables

### Via Railway Dashboard
1. Go to service → Variables
2. Click on variable to edit
3. Update value
4. Service will automatically restart

### Via Railway CLI
```bash
railway variables set VARIABLE_NAME=new_value
```

### Via GitHub Actions
Variables are managed through GitHub Secrets and passed to Railway during deployment.

## Best Practices

1. ✅ **Use Railway's built-in PostgreSQL**: Don't set `DATABASE_URL` manually
2. ✅ **Use environment-specific variables**: Different values for staging/production
3. ✅ **Document all variables**: Keep this file updated
4. ✅ **Use secure random secrets**: Generate strong secrets
5. ✅ **Rotate secrets regularly**: Especially after team member changes
6. ✅ **Monitor variable usage**: Check logs for missing variables

