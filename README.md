# Prachi Jewellery Finds

An aesthetic, high-performance web application and affiliate curation storefront for Amazon jewellery finds. Built with Next.js App Router, React, TypeScript, and Tailwind CSS. The platform features automated subscriber email alerts, private administrative inventory management, Google OAuth 2.0 authentication, Flipkart-style faceted search and filtering, 12 rich jewellery styling guides, and comprehensive legal and affiliate compliance modules.

Live Production URL: https://prachi-jewellery-finds.vercel.app  
GitHub Repository: https://github.com/devshukla430/prachi-jewellery-finds

---

## Table of Contents

1. Project Overview
2. Technology Stack
3. Core Features
4. Pinterest and Amazon Affiliate Architecture
5. Administrative Portal Security and Access Gateway
6. System Architecture and API Endpoints
7. Environment Variables
8. Local Setup and Installation
9. Deployment Guide (GitHub and Vercel)
10. Legal, Compliance, and Intellectual Property

---

## 1. Project Overview

Prachi Jewellery Finds serves as a curated digital destination for discovering handpicked fashion, anti-tarnish, and fine jewellery available on Amazon India. The platform bridges visual discovery from Pinterest and Instagram directly to high-converting, compliant editorial guides on the storefront, directing buyers to Amazon with official associate tag attribution (`prachifinds-21`).

The application features a private administrative portal allowing the store owner to add products, track outbound affiliate clicks, configure social media profiles, manage subscribers, and broadcast automated launch notifications to buyers with zero third-party subscription fees.

---

## 2. Technology Stack

### Frontend Architecture
* Framework: Next.js 14 (App Router, Server and Client Components)
* UI Library: React 18
* Language: TypeScript
* Styling: Tailwind CSS
* Iconography: Lucide React
* Responsive Design: Fluid layouts supporting Mobile Portrait, Mobile Landscape, Tablets, and Desktop viewports

### Backend and Serverless Services
* Runtime: Node.js (Next.js Serverless Route Handlers)
* Email Transport Engine: Nodemailer configured with Google Gmail SMTP
* Authentication: Google Cloud Identity Platform (OAuth 2.0 Web Client)
* Client Storage and State: React Context API with persistent browser storage synchronization
* Database Readiness: Architected for seamless pairing with Supabase (PostgreSQL)

---

## 3. Core Features

### Storefront Experience
* Category Slide Carousel: Touch-enabled, momentum-scrolling carousel with chevron navigation controls, designed specifically to eliminate clipping in phone landscape orientation.
* Dynamic Search and Faceted Filtering: Search by keyword, category, price tier (Under 99, 499, 999), brand, material, and rating.
* Flipkart-Style Sorting: Sort by relevance, popularity, price low-to-high, price high-to-low, newest arrivals, and customer ratings.
* Curated Catalogue: Seeded with high-converting, realistic jewellery pieces across Earrings, Rings, Necklaces, Bracelets, and Gift Sets.
* Editorial Content Hub: 12 comprehensive jewellery styling, buying, and care articles designed to fulfill Amazon Associates 10+ post guidelines.
* Saved Wishlist Drawer: Local client-side bookmarking of favorite jewellery finds without requiring registration.
* Automated Email Subscription: Instant welcome confirmation email dispatched upon newsletter signup.

---

## 4. Pinterest and Amazon Affiliate Architecture

The storefront is engineered around a compliant affiliate discovery funnel:

```
Pinterest Pin / Instagram Discovery
               │
               ▼
Prachi Jewellery Finds Storefront (Editorial Guide / Product Card)
               │
               ▼
"View on Amazon" Transparent Call to Action
               │
               ▼
Amazon India Official Product Page (with Associate Tag Attribution)
               │
               ▼
Qualifying Purchase and Commission Earnings
```

### Policy Compliance Standards
* Transparent Links: Every product recommendation uses explicit "View on Amazon" links and disclaimers. No automatic or deceptive redirects.
* Accurate Content: No fabricated or unverified claims regarding pricing, discounts, reviews, or delivery guarantees.
* Statutory Disclosure: Prominently displays the mandatory statement: "As an Amazon Associate I earn from qualifying purchases."
* High Content Density: 12 long-form articles providing original advice on hoop earring styling, necklace neckline matching, ring stacking, skin undertone tests, workplace jewellery etiquette, anti-tarnish PVD coating science, and tangle-free layering.

---

## 5. Administrative Portal Security and Access Gateway

To ensure the administrative management panel remains strictly confidential and protected from public exploration:

### 1. Public Route Redirection
* Plain visits to `/admin` automatically and immediately redirect public visitors back to the storefront homepage (`/`).
* Public visitors never see the login form or administrative gateway on `/admin`.

### 2. Private Owner Access Methods
The store owner can access the administrative portal through three dedicated private channels:
* Private Secret Route: Navigate directly to `/prachi-studio-gateway`.
* URL Access Key: Navigate to `/admin?access=prachi921`.
* Discreet Storefront Trigger: Clicking the copyright notice ("Prachi Jewellery Finds") in the website footer 5 times in rapid succession, or pressing keyboard shortcut `Ctrl + Shift + A`, automatically opens the private owner gateway.
* Authenticated Account Menu: When logged into an account assigned the admin role, the navigation user menu presents an "Admin Portal" link pointing to the secret gateway.

### 3. Multi-Factor Passcode and Gmail OTP Recovery
* Access is protected by an encrypted administrator passcode.
* If the passcode is forgotten, a built-in 3-step recovery flow dispatches a 6-digit one-time password (OTP) directly to the registered Google Gmail address via secure SMTP.

---

## 6. System Architecture and API Endpoints

### API Route Specifications

1. POST /api/auth/send-otp
   Dispatches a cryptographically generated 6-digit verification code to the registered owner email address via Gmail SMTP for administrator passcode recovery.

2. POST /api/auth/google
   Exchanges authorization codes and validates Google OAuth 2.0 user credentials directly with Google Cloud servers.

3. POST /api/newsletter/subscribe
   Saves subscriber email addresses and dispatches an immediate welcome confirmation email through Google Gmail SMTP.

4. POST /api/newsletter/notify-new-product
   Accepts product metadata (title, price, MRP, discount, image, and Amazon link) and broadcasts an alert to active subscribers using blind carbon copy (BCC).

5. POST /api/contact
   Receives visitor messages, inquiries, and styling questions, forwarding them directly to the administrator email address.

---

## 7. Environment Variables

Create a file named `.env.local` in the project root directory and define the following variables:

```env
# Google Cloud OAuth 2.0 Credentials (Free Tier)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Automated Email Delivery (Google Gmail SMTP - Free Tier)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_16_character_google_app_password
```

---

## 8. Local Setup and Installation

### Prerequisites
* Node.js (version 18.17.0 or higher recommended)
* npm, yarn, or pnpm

### Installation Steps

1. Clone the project repository:
   ```bash
   git clone https://github.com/devshukla430/prachi-jewellery-finds.git
   cd prachi-jewellery-finds
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Access the application:
   * Storefront: http://localhost:3000
   * Owner Private Gateway: http://localhost:3000/prachi-studio-gateway

---

## 9. Deployment Guide

### Version Control (GitHub)
Ensure all sensitive files (.env, .env.local, node_modules) are excluded by .gitignore prior to committing source files to remote repositories.

### Production Hosting (Vercel)
The application is pre-configured for automated continuous deployment on Vercel:
1. Connect the GitHub repository `devshukla430/prachi-jewellery-finds` to Vercel.
2. Configure project environment variables in the Vercel dashboard under Settings > Environment Variables.
3. Every commit pushed to `main` triggers an automatic, zero-downtime production deployment.

---

## 10. Legal, Compliance, and Intellectual Property

### Amazon Associates Compliance
Prachi Jewellery Finds operates in compliance with the Amazon Associates Program Operating Agreement and FTC affiliate disclosure guidelines. All outbound product recommendations include clear attribution.

### Copyright Notice
All Rights Reserved. The brand name "Prachi Jewellery Finds", logo assets, curated listings, editorial content, and web interface are the intellectual property of Prachi Shukla. Unauthorized reproduction, scraping, or commercial exploitation is strictly prohibited.
