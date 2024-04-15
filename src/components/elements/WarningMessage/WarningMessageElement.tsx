import styles from './WarningMessageElement.module.scss';

/**
 * Returns a message bar with yellow background to display a warning.
 *
 * @param message
 *   The contents of the message.
 */
export default function WarningMessageElement({ message }: { message: string }) {
  return (
    <span className={styles.warningMessage}>
      {message}
    </span>
  );
}
