import { useRef, useState } from 'react';
import translate from '@src/utils/helpers/translate';
import styles from './DualRangeInputElement.module.scss';

interface Props {
  min: number;
  max: number;
  unit: string;
  inputChangeCallback?: (min: number, max: number) => void;
  defaultLowerValue?: number;
  defaultUpperValue?: number;
  step?: number;
}

function getTransformStyles(offset: number, limit: number) {
  const calculatedPercentage = (offset / limit) * 100;

  return {
    left: `${calculatedPercentage}%`,
    transform: `translate(-${calculatedPercentage}%)`,
  };
}

/**
 * Returns a slider input capable of setting a minimum and maximum value.
 *
 * @param min
 *   The lowest selectable value.
 * @param max
 *   The highest selectable value.
 * @param unit
 *   The unit for the slider values (hours, kilograms, etc.).
 * @param inputChangeCallback
 *   Callback function for use of slider values in the parent component, optional.
 * @param defaultLowerValue
 *   Default selected lower value, optional. Defaults to `min`.
 * @param defaultUpperValue
 *   Default selected upper value, optional. Defaults to `max`.
 * @param step
 *   Range input step value, optional. Defaults to `1`.
 */
export default function DualRangeInputElement(
  {
    min,
    max,
    unit,
    inputChangeCallback = () => {},
    defaultLowerValue = min,
    defaultUpperValue = max,
    step = 1,
  }: Props,
) {
  const [lowerValue, setLowerValue] = useState<number>(defaultLowerValue);
  const [upperValue, setUpperValue] = useState<number>(defaultUpperValue);
  const lowerRef = useRef<HTMLInputElement>(null);
  const upperRef = useRef<HTMLInputElement>(null);

  // Generate a unique id to distinguish between
  // multiple dual range inputs on a single page.
  const uuid = crypto.randomUUID();

  // Handle changes from either range inputs.
  const handleInputChange = () => {
    if (!lowerRef.current || !upperRef.current) return;

    const currentLowerValue = parseInt(lowerRef.current.value, 10);
    const currentUpperValue = parseInt(upperRef.current.value, 10);

    setLowerValue((value) => {
      // This makes sure the upper value is never smaller than the lower.
      if (currentUpperValue < value) {
        return currentUpperValue;
      }

      return currentLowerValue;
    });

    setUpperValue((value) => {
      // This makes sure the lower value is never bigger than the upper.
      if (currentLowerValue > value) {
        return currentLowerValue;
      }

      return currentUpperValue;
    });

    // Let values bubble up to parent component.
    inputChangeCallback(currentLowerValue, currentUpperValue);
  };

  return (
    <div className={styles.inputWrapper}>
      <div
        className={styles.rangeVisualiser}
        style={{
          left: `${(lowerValue / max) * 100}%`,
          right: `${((max - upperValue) / max) * 100}%`,
        }}
      />
      <label
        htmlFor={`lower-${uuid}`}
        className={styles.label}
      >
        <input
          type="range"
          id={`lower-${uuid}`}
          name={`lower-${uuid}`}
          min={min}
          max={max}
          step={step}
          ref={lowerRef}
          value={lowerValue}
          onChange={handleInputChange}
          className={styles.input}
        />
        <div
          className={styles.labelTextWrapper}
          style={getTransformStyles(lowerValue, max)}
        >
          <div className={styles.arrowContainer}>
            <span
              className={styles.arrow}
              style={getTransformStyles(lowerValue, max)}
            />
          </div>
          <span className={styles.labelText}>
            {translate('Min')}: {lowerValue} {unit}
          </span>
        </div>
      </label>
      <label
        htmlFor={`upper-${uuid}`}
        className={styles.label}
      >
        <input
          type="range"
          id={`upper-${uuid}`}
          name={`upper-${uuid}`}
          min={min}
          max={max}
          step={step}
          ref={upperRef}
          value={upperValue}
          onChange={handleInputChange}
          className={styles.input}
        />
        <div
          className={`${styles.labelTextWrapper} ${styles.labelTextWrapperMax}`}
          style={getTransformStyles(upperValue, max)}
        >
          <div className={styles.arrowContainer}>
            <span
              className={styles.arrow}
              style={getTransformStyles(upperValue, max)}
            />
          </div>
          <span className={styles.labelText}>
            {translate('Max')}: {upperValue} {unit}
          </span>
        </div>
      </label>
    </div>
  );
}
