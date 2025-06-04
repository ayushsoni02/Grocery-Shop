# 🧩 Grocery App – Implementation Flow

## 🎯 Objective

To build a responsive, user-friendly grocery shopping experience that includes:

- Category filtering, search, and cart functionality  
- Dynamic offer application (buy X get Y)  
- Smooth state management with localStorage persistence  

---

## 🧱 Tech Stack

| Area        | Tech Used           |
|-------------|---------------------|
| Framework   | React + TypeScript  |
| Build Tool  | Vite                |
| Styling     | Tailwind CSS        |
| State Mgmt  | Zustand + persist   |
| Routing     | React Router DOM    |
| Hosting     | Vercel              |

---

## 🗂️ File Structure (Simplified)

src/
├── components/
│   └── Navbar.tsx, ProductCard.tsx
├── pages/
│   └── Home.tsx, Checkout.tsx, Success.tsx
├── store/
│   └── cartStore.ts (Zustand store with persistence + offers)
├── types/
│   └── product.ts (normalized + API product types)



🔁 Flow Breakdown

1. Data Fetching

    API: https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all

    On page load and category filter change, fetch and normalize API data into a consistent Product type:

    {
      id: string,
      title: string,
      description: string,
      price: number,
      stock: number,
      image: string,
      category: string
    }

2. Search & Filter

    Products are filtered using .includes() on the normalized title.

    Category filters modify the API query param (?category=fruit, drinks, etc.).

3. Cart State (Zustand)

    Global state using Zustand:

        cart: Array of CartItems

        addToCart, removeFromCart, updateQuantity, getSubtotal, getDiscount

    State is persisted using zustand/middleware with localStorage.

4. Offer Logic

Implemented directly in addToCart() and updateQuantity():

    Buy 6 Coca-Cola → Get 1 Free

    Buy 3 Croissants → Get 1 Coffee Free

    Logic ensures:

        Free item is added when offer is met

        Removed if criteria no longer valid

        Free items are marked with isFree: true and display 🎁 badge

5. Checkout Page

    Displays cart items with quantity buttons and remove options.

    Recalculates subtotal, discount, and total in real-time.

    Navigates to /success on "Checkout" button click.

6. Success Page

    Simple thank-you message with option to return to homepage.

    Optional: clear cart on checkout if required.

✅ Key Design Choices

    Zustand over Redux for lightweight, direct state control.

    Normalization of API product structure for predictable UI logic.

    Persistent state to improve UX across refreshes.

    No backend for simplicity — purely frontend + API-driven.

📱 Responsive Design

    Tailwind used for breakpoints and adaptive layouts.

    Product grid adjusts from 1 to 3 columns based on screen size.

