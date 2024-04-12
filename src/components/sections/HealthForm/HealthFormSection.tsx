import DualRangeInputElement from '@src/components/elements/DualRangeInput/DualRangeInputElement';
import SleepRangeGroup from '@src/components/groups/SleepRange/SleepRangeGroup';
import FormFieldTemplate from '@src/components/templates/FormField/FormFieldTemplate';
import translate from '@src/utils/helpers/translate';
import styles from './HealthFormSection.module.scss';

export default function HealthFormSection() {
  return (
    <section className={styles.healthForm}>
      <SleepRangeGroup />
      <FormFieldTemplate label={translate('Please indicate your average weight per month')}>
        <DualRangeInputElement
          min={40}
          max={300}
          unit={translate('kg')}
        />
      </FormFieldTemplate>
    </section>
  );
}
