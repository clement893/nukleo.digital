# Documentation API - Nukleo Digital

> Documentation complète de l'API tRPC de Nukleo Digital
> Dernière mise à jour: Décembre 2024

## 📋 Table des Matières

- [Introduction](#introduction)
- [Authentification](#authentification)
- [Routes Publiques](#routes-publiques)
- [Routes Admin](#routes-admin)
- [Types TypeScript](#types-typescript)
- [Exemples d'utilisation](#exemples-dutilisation)

## Introduction

L'API Nukleo Digital utilise **tRPC 11**, une solution type-safe pour les APIs TypeScript. Toutes les routes sont typées automatiquement et partagées entre le client et le serveur.

### Base URL

- **Production**: `https://nukleo.digital`
- **Staging**: `https://nukleodigital-staging.up.railway.app`
- **Local**: `http://localhost:3000`

### Format des Réponses

Toutes les réponses suivent le format tRPC standard. Les erreurs sont retournées avec des codes HTTP appropriés et des messages d'erreur descriptifs.

## Authentification

### Types d'Authentification

1. **Manus OAuth** - Pour les clients (espace client)
2. **Google OAuth** - Pour les administrateurs
3. **JWT Cookie** - Pour les admins legacy

### Vérifier l'Authentification

```typescript
// Client-side
const { data: user } = trpc.auth.me.useQuery();

if (user) {
  console.log('Authentifié:', user.email);
} else {
  console.log('Non authentifié');
}
```

### Déconnexion

```typescript
const logoutMutation = trpc.auth.logout.useMutation();

await logoutMutation.mutateAsync();
```

## Routes Publiques

### `pageVisibility`

Gestion de la visibilité des pages.

#### `getAll`

Récupère toutes les pages avec leur statut de visibilité.

**Query**
```typescript
trpc.pageVisibility.getAll.useQuery()
```

**Réponse**
```typescript
Array<{
  path: string;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}>
```

#### `getByPath`

Récupère la visibilité d'une page spécifique.

**Input**
```typescript
{ path: string }
```

**Query**
```typescript
trpc.pageVisibility.getByPath.useQuery({ path: '/about' })
```

**Réponse**
```typescript
{
  path: string;
  isVisible: boolean;
}
```

### `contact`

Gestion des messages de contact.

#### `send`

Envoie un message de contact.

**Input**
```typescript
{
  name: string;
  email: string;
  message: string;
  subject?: string;
}
```

**Mutation**
```typescript
const sendContact = trpc.contact.send.useMutation();

await sendContact.mutateAsync({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello!',
});
```

**Réponse**
```typescript
{
  success: boolean;
  message: string;
}
```

### `leo`

Assistant IA Leo - Chat et gestion de contacts.

#### `chat`

Envoie un message à Leo et reçoit une réponse.

**Input**
```typescript
{
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
}
```

**Mutation**
```typescript
const chatMutation = trpc.leo.chat.useMutation();

const response = await chatMutation.mutateAsync({
  messages: [
    { role: 'user', content: 'Hello Leo!' }
  ],
});
```

**Réponse**
```typescript
{
  content: string;
}
```

#### `saveContact`

Sauvegarde un contact depuis Leo.

**Input**
```typescript
{
  email: string;
  name?: string;
  conversationContext?: string;
}
```

**Mutation**
```typescript
const saveContact = trpc.leo.saveContact.useMutation();

await saveContact.mutateAsync({
  email: 'user@example.com',
  name: 'User Name',
  conversationContext: 'User asked about AI services',
});
```

#### `createSession`

Crée une nouvelle session Leo.

**Input**
```typescript
{
  sessionId: string;
  pageContext: string;
}
```

#### `updateSession`

Met à jour une session Leo existante.

**Input**
```typescript
{
  sessionId: string;
  messageCount?: number;
  emailCaptured?: number;
  capturedEmail?: string;
  conversationDuration?: number;
  completedAt?: Date;
}
```

### `testimonials`

Gestion des témoignages clients.

#### `getAll`

Récupère tous les témoignages visibles.

**Query**
```typescript
trpc.testimonials.getAll.useQuery()
```

**Réponse**
```typescript
Array<{
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating?: number;
  isVisible: boolean;
  createdAt: Date;
}>
```

### `radar`

AI Trend Radar - Technologies et tendances IA.

#### `getTechnologies`

Récupère toutes les technologies du radar.

**Query**
```typescript
trpc.radar.getTechnologies.useQuery()
```

#### `getPositions`

Récupère les positions pour une technologie.

**Input**
```typescript
{ technologySlug: string }
```

**Query**
```typescript
trpc.radar.getPositions.useQuery({ technologySlug: 'gpt-4' })
```

### `projectsImages`

Gestion des images de projets.

#### `getAll`

Récupère toutes les images de projets.

**Query**
```typescript
trpc.projectsImages.getAll.useQuery()
```

**Réponse**
```typescript
Array<{
  id: number;
  filename: string;
  projectName?: string;
  uploadedAt: Date;
}>
```

## Routes Admin

> ⚠️ **Requiert authentification admin**

### `admin`

Routes administratives principales.

#### `getStats`

Récupère les statistiques du dashboard admin.

**Query**
```typescript
trpc.admin.getStats.useQuery()
```

**Réponse**
```typescript
{
  totalContacts: number;
  totalProjects: number;
  totalTestimonials: number;
  recentActivity: Array<Activity>;
}
```

#### `pageVisibility.update`

Met à jour la visibilité d'une page.

**Input**
```typescript
{
  path: string;
  isVisible: boolean;
}
```

**Mutation**
```typescript
const updateVisibility = trpc.admin.pageVisibility.update.useMutation();

await updateVisibility.mutateAsync({
  path: '/about',
  isVisible: false,
});
```

### `adminAuth`

Authentification admin.

#### `login`

Redirige vers la page de connexion Google OAuth.

**Note**: Cette route est gérée côté serveur via Express, pas via tRPC.

## Types TypeScript

### Import des Types

```typescript
import type { AppRouter } from '@/server/routers';

// Utiliser avec createTRPCReact
import { createTRPCReact } from '@trpc/react-query';
export const trpc = createTRPCReact<AppRouter>();
```

### Types d'Utilisateur

```typescript
interface User {
  id: number;
  openId: string;
  email: string | null;
  name: string | null;
  loginMethod: 'google' | 'manus' | 'admin';
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
}
```

## Exemples d'Utilisation

### Exemple Complet - Formulaire de Contact

```typescript
import { trpc } from '@/lib/trpc';
import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const sendContact = trpc.contact.send.useMutation({
    onSuccess: () => {
      alert('Message envoyé avec succès!');
      setFormData({ name: '', email: '', message: '' });
    },
    onError: (error) => {
      alert(`Erreur: ${error.message}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendContact.mutateAsync(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  );
}
```

### Exemple - Chat avec Leo

```typescript
import { trpc } from '@/lib/trpc';
import { useState } from 'react';

function LeoChat() {
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
  }>>([]);

  const chatMutation = trpc.leo.chat.useMutation({
    onSuccess: (response) => {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: response.content },
      ]);
    },
  });

  const sendMessage = async (content: string) => {
    const newMessages = [...messages, { role: 'user', content }];
    setMessages(newMessages);
    
    await chatMutation.mutateAsync({
      messages: newMessages,
    });
  };

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>{msg.content}</div>
      ))}
      {/* Input pour envoyer des messages */}
    </div>
  );
}
```

### Exemple - Vérification de Visibilité de Page

```typescript
import { trpc } from '@/lib/trpc';

function Navigation() {
  const { data: pages } = trpc.pageVisibility.getAll.useQuery();
  
  const visiblePages = pages?.filter(page => page.isVisible) || [];
  
  return (
    <nav>
      {visiblePages.map(page => (
        <a key={page.path} href={page.path}>
          {page.path}
        </a>
      ))}
    </nav>
  );
}
```

## Gestion des Erreurs

### Codes d'Erreur tRPC

- `UNAUTHORIZED` (401) - Non authentifié
- `FORBIDDEN` (403) - Pas les permissions nécessaires
- `NOT_FOUND` (404) - Ressource non trouvée
- `BAD_REQUEST` (400) - Requête invalide
- `INTERNAL_SERVER_ERROR` (500) - Erreur serveur

### Exemple de Gestion d'Erreur

```typescript
const mutation = trpc.contact.send.useMutation({
  onError: (error) => {
    if (error.data?.code === 'UNAUTHORIZED') {
      // Rediriger vers la page de connexion
    } else if (error.data?.code === 'BAD_REQUEST') {
      // Afficher le message d'erreur
      alert(error.message);
    } else {
      // Erreur générique
      alert('Une erreur est survenue');
    }
  },
});
```

## Rate Limiting

Certaines routes sont limitées en taux de requêtes :

- **Routes générales**: 100 requêtes / 15 minutes
- **Routes d'authentification**: 20 requêtes / 15 minutes

En cas de dépassement, une erreur `TOO_MANY_REQUESTS` est retournée.

## Support

Pour toute question sur l'API, consultez :
- [Guide de Contribution](./CONTRIBUTING.md)
- [README](./README.md)
- Créer une issue sur GitHub

