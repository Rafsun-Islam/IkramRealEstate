# Ikram Real Estate

A modern, responsive real estate website with a complete admin dashboard for managing property projects, gallery images, and client inquiries.

The project is built with React, Firebase, Cloudinary, and Vercel. It includes public pages for visitors and a protected admin panel for the client to update website content without touching the code.

## Live Website

```txt
https://ikramrealestate.vercel.app
```

## Features

### Public Website

- Modern responsive homepage
- About page
- Projects listing page
- Project details page with dynamic slug routing
- Gallery page connected with admin uploaded images
- Contact page with Google Maps embed
- Contact form connected to Firestore
- SEO-friendly title/meta setup
- Custom 404 page
- Mobile-first responsive design

### Admin Dashboard

- Protected admin login with Firebase Authentication
- Dashboard overview
- Add, edit, and delete property projects
- Auto-generated project slug from project title
- Multiple project image upload
- Client-side image optimization and WebP conversion
- Cloudinary image hosting
- Gallery image upload and delete
- Contact message management
- Mark messages as read/unread
- Custom delete confirmation modals
- Responsive admin sidebar and layout

## Tech Stack

```txt
Frontend: React + Vite
Routing: React Router DOM
Authentication: Firebase Auth
Database: Firebase Firestore
Image Hosting: Cloudinary
Icons: React Icons
Deployment: Vercel
Styling: Page-level CSS
```

## Folder Structure

```txt
src/
├── assets/
│   └── images/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── SEO.jsx
├── context/
│   └── AuthContext.jsx
├── data/
│   ├── heroData.js
│   ├── projectsData.js
│   └── siteData.js
├── lib/
│   ├── firebase.js
│   └── cloudinary.js
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── ProjectDetails.jsx
│   ├── Gallery.jsx
│   ├── Contact.jsx
│   ├── NotFound.jsx
│   └── admin/
│       ├── AdminLayout.jsx
│       ├── AdminLogin.jsx
│       ├── AdminDashboard.jsx
│       ├── AdminProjects.jsx
│       ├── AdminProjectForm.jsx
│       ├── AdminGallery.jsx
│       └── AdminMessages.jsx
├── services/
│   ├── projectService.js
│   ├── galleryService.js
│   └── contactService.js
├── utils/
│   ├── imageUtils.js
│   ├── slugUtils.js
│   └── seoSchemas.js
└── App.jsx
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Rafsun-Islam/IkramRealEstate.git
cd IkramRealEstate
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```bash
cp .env.example .env
```


## Environment Variables

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```


## Run Locally

```bash
npm run dev
```

The local development server will usually start at:

```txt
http://localhost:5173
```

## Build

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Firebase Setup

This project uses Firebase Authentication and Firestore.

Required Firebase services:

```txt
Authentication
Firestore Database
```

Firebase Storage is not required because image uploads are handled by Cloudinary.

### Firestore Collections

```txt
projects
gallery
messages
```

### Firestore Security Rules

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() {
      return request.auth != null;
    }

    match /projects/{projectId} {
      allow read: if true;
      allow create, update, delete: if isSignedIn();
    }

    match /gallery/{imageId} {
      allow read: if true;
      allow create, update, delete: if isSignedIn();
    }

    match /messages/{messageId} {
      allow create: if true;
      allow read, update, delete: if isSignedIn();
    }
  }
}
```

## Cloudinary Setup

This project uses Cloudinary unsigned upload preset for image uploads.

Required Cloudinary values:

```txt
Cloud Name
Unsigned Upload Preset
```

Recommended preset settings:

```txt
Signing Mode: Unsigned
Asset Folder: ikram-real-estate
Resource Type: Image
```

Uploaded images are optimized in the browser before upload:

```txt
Max width: 1600px
Format: WebP
Quality: 0.78
```

## Admin Panel

Admin login route:

```txt
/admin/login
```

Admin dashboard routes:

```txt
/admin/dashboard
/admin/projects
/admin/projects/new
/admin/projects/:id/edit
/admin/gallery
/admin/messages
```

Admin can manage:

```txt
Property projects
Project images
Gallery images
Client contact messages
```

## Deployment

The project is deployed on Vercel.

### Vercel Environment Variables


```txt
Vercel Project → Settings → Environment Variables
```

Use these environments:

```txt
Production
Preview
Development
```

### Vercel SPA Routing

This project uses React Router. For direct route refresh support on Vercel, `vercel.json` is included:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## SEO

The project includes basic SEO setup:

```txt
Page title
Meta description
Canonical URL
Open Graph tags
Twitter card tags
JSON-LD structured data
robots.txt
sitemap.xml
Admin noindex
```

Public pages are indexable. Admin pages are marked as noindex.


## Scripts

Start the development server:

```bash
npm run dev
```

Build the project for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run linting if configured:

```bash
npm run lint
```

## License

This project is created for Ikram Real Estate. All rights reserved.
