import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import '../styles.css'
import '../loadingStyle.css'

const App = lazy(() => import('./App'));

const root = document.getElementById('root');

if (root) {
  // Development server + website server
  createRoot(root).render(<StrictMode>
    <Suspense fallback={<div id="loadIcon">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>}>
    <App/>
    </Suspense>
    <Analytics />
  </StrictMode>
  );
}
