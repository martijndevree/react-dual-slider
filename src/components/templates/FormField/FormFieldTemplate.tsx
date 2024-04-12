import { ReactNode } from 'react';
import styles from './FormFieldTemplate.module.scss';

interface Props {
  label: string;
  children: ReactNode;
}

export default function FormFieldTemplate({ label, children }: Props) {
  return (
    <div className={styles.formField}>
      {label}:
      {children}
    </div>
  );
}
