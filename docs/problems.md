# 1. Managing state in a table having multiple rows

## Gemini - Query 1: I am creating a table. It have the cart items of a person. How can I manage the state of the cart items quantity. As there will be multiple rows and the if I let the row manage the state then I can't calculate the total value of then cart as it will be the sum of the total of the each row and the number of rows can also vary and the total component showing the total price of the cart will lie in the parent element of the rows one. How to approach this problem and solve it?

Of course\! This is a classic state management problem in web development. You've correctly identified the issue: if each row manages its own state, the parent component has no easy way to access that information to calculate the total.

The solution is a core principle in modern UI frameworks (like React, Vue, Angular, etc.) called **"Lifting State Up"**.

### The Core Concept: Lifting State Up

Instead of each row component managing its own quantity, you move the state for the _entire cart_ into the closest common ancestor component. This is the parent component that contains both the table of items and the total summary.

This parent component becomes the **single source of truth** for the cart's data.

Here's how you can approach this, broken down into steps:

---

### Step 1: Define the Data Structure in the Parent

In your parent component (let's call it `CartPage`), you should maintain an array of objects as your state. Each object will represent an item in the cart.

A good structure for this state would be:

```javascript
[
  { id: "prod123", name: "Wireless Mouse", price: 2500, quantity: 2 },
  { id: "prod456", name: "Mechanical Keyboard", price: 8000, quantity: 1 },
  { id: "prod789", name: "4K Monitor", price: 35000, quantity: 1 },
];
```

This array will be the single source of truth for your entire cart.

### Step 2: Parent Component Manages State and Logic

The `CartPage` (parent) component will be responsible for:

1.  **Holding the State:** It will store the array of cart items.
2.  **Creating Functions to Modify State:** It will have functions like `handleQuantityChange` or `handleRemoveItem`. These functions will be the _only_ way the state is allowed to change.
3.  **Calculating the Total:** Since it has all the data, it can easily calculate the total price.
4.  **Passing Data and Functions to Children:** It will pass the individual item data and the modification functions down to each row component as "props".

### Step 3: Child (Row) Component Becomes "Dumb"

The row component (let's call it `CartItemRow`) no longer has its own internal state for quantity. It becomes a "presentational" or "dumb" component. Its responsibilities are:

1.  **Receive Props:** It receives the item's data (name, price, quantity) and the functions to call (`onQuantityChange`, `onRemove`) from the parent.
2.  **Display Data:** It renders the information it received.
3.  **Call Parent Functions:** When a user clicks a `+` or `-` button, the row component doesn't change its own state. Instead, it calls the function passed down from the parent, providing the item's `id` and the new desired quantity.

---

### Example (using React-like pseudocode)

This will make the concept much clearer.

#### 1\. The Parent Component (`CartPage.js`)

```jsx
import React, { useState } from "react";
import CartItemRow from "./CartItemRow";

function CartPage() {
  // 1. STATE IS LIFTED UP to the parent component.
  const [cartItems, setCartItems] = useState([
    { id: "prod123", name: "Wireless Mouse", price: 2500, quantity: 2 },
    { id: "prod456", name: "Mechanical Keyboard", price: 8000, quantity: 1 },
    { id: "prod789", name: "4K Monitor", price: 35000, quantity: 1 },
  ]);

  // 2. LOGIC to modify state lives in the parent.
  const handleQuantityChange = (itemId, newQuantity) => {
    // Ensure quantity doesn't go below 1
    if (newQuantity < 1) return;

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    );
  };

  // 3. DERIVED DATA (total) is calculated here.
  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* 4. Pass down data and functions as props */}
          {cartItems.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
            />
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <h2>Total: ₹{cartTotal.toLocaleString("en-IN")}</h2>
      </div>
    </div>
  );
}

export default CartPage;
```

#### 2\. The Child Component (`CartItemRow.js`)

```jsx
import React from "react";

// This component is "dumb". It just displays data and calls functions from props.
function CartItemRow({ item, onQuantityChange, onRemove }) {
  const rowTotal = item.price * item.quantity;

  return (
    <tr>
      <td>{item.name}</td>
      <td>₹{item.price.toLocaleString("en-IN")}</td>
      <td>
        <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>
          -
        </button>
        <span> {item.quantity} </span>
        <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
          +
        </button>
      </td>
      <td>₹{rowTotal.toLocaleString("en-IN")}</td>
      <td>
        <button onClick={() => onRemove(item.id)}>Remove</button>
      </td>
    </tr>
  );
}

export default CartItemRow;
```

### The Data Flow

1.  **User Action:** A user clicks the `+` button on the "Wireless Mouse" row.
2.  **Child Calls Parent:** The `CartItemRow`'s `onClick` handler fires. It calls the `onQuantityChange` function it received as a prop, passing `'prod123'` and `3` (the new quantity).
3.  **Parent Updates State:** The `handleQuantityChange` function in `CartPage` receives this call. It updates the `cartItems` state array, changing the quantity of the mouse object to 3.
4.  **Re-render:** The state update causes the `CartPage` component to re-render.
5.  **Data Flows Down:** During the re-render, the updated `cartItems` array is used.
    - The "Wireless Mouse" `CartItemRow` is now passed a quantity of `3` and displays it.
    - The `cartTotal` is recalculated with the new quantity, and the total summary in the parent component updates automatically.

This approach solves all your problems:

- **Centralized Logic:** All cart logic is in one place.
- **Single Source of Truth:** No conflicting states. The `cartItems` array is the definitive data.
- **Easy Total Calculation:** The parent has all the information it needs to calculate the total at any time.
- **Scalability:** It works perfectly whether you have 1 item or 100 items in the cart.
