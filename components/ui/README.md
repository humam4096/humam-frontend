# UI Components

Reusable, generic UI components that can be used across the entire application.

## Components

### Modal

A flexible, accessible modal dialog component with animations and keyboard support.

**Location:** `Modal.tsx`

**Props:**
- `isOpen: boolean` - Controls modal visibility
- `onClose: () => void` - Callback when modal should close
- `title?: string` - Optional modal title
- `children: ReactNode` - Modal content
- `size?: 'small' | 'medium' | 'large'` - Modal size (default: 'medium')

**Features:**
- Smooth fade and slide animations
- Escape key to close
- Click outside to close
- Body scroll lock when open
- Accessible (ARIA attributes)
- Responsive sizing

**Usage:**
```tsx
import {Modal} from '@/components/ui/Modal';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="My Modal"
        size="medium"
      >
        <p>Modal content goes here</p>
      </Modal>
    </>
  );
}
```

### StatusBadge

A badge component for displaying status indicators with color coding.

**Location:** `StatusBadge.tsx`

**Props:**
- `status: 'new' | 'read' | 'replied'` - The status to display

**Features:**
- Pre-defined color schemes for each status
- Consistent styling across the application

**Usage:**
```tsx
import {StatusBadge} from '@/components/ui/StatusBadge';

<StatusBadge status="new" />
```

## Styling

All components use CSS Modules for styling to ensure:
- Scoped styles (no global pollution)
- Type-safe class names
- Easy customization
- Maintainability

## Adding New UI Components

When creating new reusable UI components:

1. Create the component file in this directory
2. Create a corresponding `.module.css` file for styles
3. Export the component from `index.ts`
4. Add documentation to this README
5. Keep components generic and configurable via props
