# Database Schema - ER Diagram

This document provides a visual representation of the e-commerce database schema using a Mermaid ER diagram.

## Entity Relationship Diagram

```mermaid
erDiagram
    %% ==================== USER & AUTHENTICATION ====================
    users {
        text id PK
        text name
        text email UK
        timestamp emailVerified
        text image
        user_role role
    }

    accounts {
        text userId FK
        text type
        text provider PK
        text providerAccountId PK
        text refresh_token
        text access_token
        integer expires_at
        text token_type
        text scope
        text id_token
        text session_state
    }

    verificationTokens {
        text identifier PK
        text token PK
        timestamp expires
    }

    authenticators {
        text credentialID UK
        text userId PK,FK
        text providerAccountId
        text credentialPublicKey
        integer counter
        text credentialDeviceType
        boolean credentialBackedUp
        text transports
    }

    %% ==================== ADDRESSES ====================
    addresses {
        text id PK
        text userId FK
        text recipient_name
        text lane1
        text lane2
        text landmark
        text city
        text state
        text postal_code
        address_country country
        address_type address_type
        text other_address_type
    }

    %% ==================== SELLER & STORES ====================
    sellers {
        text id PK
        text userId FK
        text business_name
        integer phone_number UK
        text stripe_account_id UK
        boolean is_verified
        boolean agreed_to_terms
        timestamp created_at
        timestamp updated_at
    }

    stores {
        text id PK
        text seller_id FK
        text store_name UK
        text store_description
        text slug UK
        text logo_image
        text cover_image
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    %% ==================== PRODUCTS ====================
    products {
        text id PK
        text store_id FK
        text name UK
        text description
        tsvector search_vector
        text slug UK
        text main_img UK
        product_status status
        timestamp created_at
        timestamp updated_at
    }

    productVariants {
        text id PK
        text product_id FK
        text sku UK
        text name
        text color
        text size
        integer price
        integer quantity
        timestamp created_at
        timestamp updated_at
    }

    categories {
        text id PK
        text name
        text slug UK
        text parent_id FK
        timestamp created_at
        timestamp updated_at
    }

    tags {
        text id PK
        text name UK
        text description
        timestamp created_at
        timestamp updated_at
    }

    productsToCategories {
        text product_id PK,FK
        text category_id PK,FK
    }

    productToTags {
        text product_id PK,FK
        text tag_id PK,FK
    }

    %% ==================== CART ====================
    cart {
        text id PK
        text user_id FK,UK
        timestamp created_at
        timestamp updated_at
    }

    cartItems {
        text id PK
        text cart_id FK
        text product_id FK
        text variant_id FK
        integer quantity
        timestamp added_at
    }

    %% ==================== ORDERS ====================
    orders {
        text id PK
        text user_id FK
        order_status status
        numeric total_amount
        text shipping_address_id FK
        timestamp order_date
        timestamp delivery_date
    }

    orderItems {
        text id PK
        text order_id FK
        text product_id FK
        text variant_id FK
        integer quantity
        numeric price_at_order
    }

    %% ==================== WISHLISTS ====================
    wishlists {
        text id PK
        text user_id FK,UK
        timestamp created_at
        timestamp updated_at
    }

    wishlistsItems {
        text id PK
        text wishlists_id FK
        text product_id FK
        timestamp added_at
    }

    %% ==================== RELATIONSHIPS ====================
    
    %% User relationships
    users ||--o{ accounts : "has"
    users ||--o{ authenticators : "has"
    users ||--o{ addresses : "has"
    users ||--o| sellers : "can be"
    users ||--o| cart : "has"
    users ||--o| wishlists : "has"
    users ||--o{ orders : "places"

    %% Seller & Store relationships
    sellers ||--o{ stores : "owns"
    stores ||--o{ products : "sells"

    %% Product relationships
    products ||--o{ productVariants : "has"
    products ||--o{ productsToCategories : "belongs to"
    products ||--o{ productToTags : "tagged with"
    categories ||--o{ productsToCategories : "contains"
    tags ||--o{ productToTags : "applied to"
    categories ||--o| categories : "parent of"

    %% Cart relationships
    cart ||--o{ cartItems : "contains"
    cartItems }o--|| products : "references"
    cartItems }o--|| productVariants : "references"

    %% Order relationships
    orders ||--o{ orderItems : "contains"
    orders }o--|| addresses : "ships to"
    orderItems }o--|| products : "references"
    orderItems }o--|| productVariants : "references"

    %% Wishlist relationships
    wishlists ||--o{ wishlistsItems : "contains"
    wishlistsItems }o--|| products : "references"
```

## Table Descriptions

### User & Authentication
| Table | Description |
|-------|-------------|
| **users** | Core user table with basic profile info and role (Buyer/Seller) |
| **accounts** | OAuth provider accounts linked to users (Auth.js adapter) |
| **verificationTokens** | Tokens for email verification |
| **authenticators** | WebAuthn/passkey authentication credentials |

### Addresses
| Table | Description |
|-------|-------------|
| **addresses** | User shipping/billing addresses with type (Home/Work/Other) |

### Seller & Stores
| Table | Description |
|-------|-------------|
| **sellers** | Seller profiles linked to users, includes Stripe account info |
| **stores** | Individual stores owned by sellers |

### Products
| Table | Description |
|-------|-------------|
| **products** | Main product listings with search vector for full-text search |
| **productVariants** | Product variations (size, color, etc.) with pricing and stock |
| **categories** | Hierarchical product categories (self-referencing for subcategories) |
| **tags** | Product tags for additional categorization |
| **productsToCategories** | Many-to-many junction table for products ↔ categories |
| **productToTags** | Many-to-many junction table for products ↔ tags |

### Cart
| Table | Description |
|-------|-------------|
| **cart** | Shopping cart (one per user) |
| **cartItems** | Items in the cart with product/variant references and quantity |

### Orders
| Table | Description |
|-------|-------------|
| **orders** | Placed orders with status and shipping info |
| **orderItems** | Individual items in an order with price snapshot at order time |

### Wishlists
| Table | Description |
|-------|-------------|
| **wishlists** | User wishlists (one per user) |
| **wishlistsItems** | Products saved to wishlist |

## Enums

| Enum | Values |
|------|--------|
| **user_role** | `Seller`, `Buyer` |
| **address_type** | `Home`, `Work`, `Other` |
| **address_country** | `India`, `United States` |
| **product_status** | `draft`, `active`, `archived` |
| **order_status** | `PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED` |
