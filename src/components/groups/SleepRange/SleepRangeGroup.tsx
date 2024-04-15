import { useCallback, useState } from 'react';
import DualRangeInputElement from '@src/components/elements/DualRangeInput/DualRangeInputElement';
import WarningMessageElement from '@src/components/elements/WarningMessage/WarningMessageElement';
import FormFieldTemplate from '@src/components/templates/FormField/FormFieldTemplate';
import translate from '@src/utils/helpers/translate';
import styles from './SleepRangeGroup.module.scss';

/**
 * Returns a grouped form field capable of displaying a warning message based on the user's input.
 */
export default function SleepRangeGroup() {
  const [showMessage, setShowMessage] = useState<boolean>(false);

  // This is called when values in `DualRangeInputElement` change.
  const inputChangeCallback = useCallback((min: number, max: number) => {
    setShowMessage(() => min < 7 || max > 9);
  }, []);

  return (
    <div className={styles.sleepRange}>
      <FormFieldTemplate label={translate('Please indicate the minimum and maximum hours of sleep you get on an average day')}>
        <DualRangeInputElement
          min={0}
          max={24}
          defaultLowerValue={7}
          defaultUpperValue={9}
          unit={translate('hours')}
          inputChangeCallback={inputChangeCallback}
        />
      </FormFieldTemplate>
      {showMessage && (
        <WarningMessageElement
          message={translate('Please note that it is important for the average person to sleep 7 to 9 hours a day!')}
        />
      )}
    </div>
  );
}
