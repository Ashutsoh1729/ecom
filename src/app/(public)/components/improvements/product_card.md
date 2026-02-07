**Missing Data Points:**

- `discount/originalPrice` - show savings
- `stock/availability` - inventory status
- `brand` - important for filtering/trust
- `images` array - multiple product views
- `reviewCount` - context for rating
- `description/shortDescription` - product summary
- `variants` - colors, sizes if applicable
- `isNew/isFeatured` - promotional badges

**Component Improvements:**

1. **Not using `rating` and `category`** - these are in your interface but unused in the component

2. **Visual enhancements:**
   - Add stock indicator ("Only 3 left", "Out of stock")
   - Show rating stars with review count
   - Display discount badge if applicable
   - Add quick view/quick add to cart option

3. **UX issues:**
   - Missing loading state for image
   - No error boundary for failed image loads
   - Button text could be shorter: "View Details"
   - Consider adding keyboard navigation (onKeyDown)

4. **Performance:**
   - Add `priority` prop to Image for above-fold cards
   - Use `sizes` prop for responsive images

5. **Accessibility:**
   - Wrap entire card in clickable area (not just button)
   - Add aria-label to LikeButton
