import styles from './WarningMessageElement.module.scss';

export default function WarningMessageElement({ message }: { message: string }) {
  return (
    <span className={styles.warningMessage}>
      {message}
    </span>
  );
}
