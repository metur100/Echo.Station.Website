import { StrictMode, type ReactElement } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

/** Hydrates prerendered HTML in production builds, renders from scratch in dev. */
export function mount(element: ReactElement) {
  const root = document.getElementById('root');
  if (!root) throw new Error('Missing #root element');
  const tree = <StrictMode>{element}</StrictMode>;
  if (root.firstElementChild) hydrateRoot(root, tree);
  else createRoot(root).render(tree);
}
