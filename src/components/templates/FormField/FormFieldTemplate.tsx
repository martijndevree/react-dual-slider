import { ReactNode } from 'react';
import styles from './FormFieldTemplate.module.scss';

interface Props {
  label: string;
  children: ReactNode;
}

/**
 * Returns a reusable template for a field with an accompanying label.
 *
 * @param label
 *   The label value.
 * @param children
 *   The field element.
 */
export default function FormFieldTemplate({ label, children }: Props) {
  return (
    <div className={styles.formField}>
      {label}:
      {children}
    </div>
  );
}
