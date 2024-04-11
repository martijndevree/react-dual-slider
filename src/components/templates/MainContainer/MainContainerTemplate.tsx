import { ReactNode } from 'react';
import styles from './MainContainerTemplate.module.scss';

interface Props {
  children: ReactNode;
}

export default function MainContainerTemplate({ children }: Props) {
  return (
    <main className={styles.mainContainer}>
      {children}
    </main>
  );
}
