import { ReactNode } from 'react';
import styles from './MainContainerTemplate.module.scss';

/**
 * Returns a reusable `main` container.
 *
 * @param children
 *   Any React node.
 */
export default function MainContainerTemplate({ children }: { children: ReactNode }) {
  return (
    <main className={styles.mainContainer}>
      {children}
    </main>
  );
}
