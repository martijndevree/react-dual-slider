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

/**
 * Returns a number between 0 and 100 which is used for positioning of an element,
 * based on its current represented value relative to its lowest possible value.
 *
 * What this means: on a slider from 0 to 10 - when an element's value is `3`, this
 * function will return `30`.
 *
 * @param offset
 *   The represented value of the element we want to know the offset for.
 * @param min
 *   The lowest possible value of the element.
 * @param max
 *   The highest possible value of the element.
 */
function getLeftPercentageOffset(offset: number, min: number, max: number): number {
  return ((offset - min) / (max - min)) * 100;
}

/**
 * Returns a number between 0 and 100 which is used for positioning of an element,
 * based on its current represented value relative to its highest possible value.
 *
 * This is essentially the same as `getLeftPercentageOffset()`, but for the other side.
 *
 * @param offset
 *   The represented value of the element we want to know the offset for.
 * @param min
 *   The lowest possible value of the element.
 * @param max
 *   The highest possible value of the element.
 */
function getRightPercentageOffset(offset: number, min: number, max: number): number {
  return ((max - offset) / (max - min)) * 100;
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
          left: `${getLeftPercentageOffset(lowerValue, min, max)}%`,
          right: `${getRightPercentageOffset(upperValue, min, max)}%`,
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
          style={{
            left: `${getLeftPercentageOffset(lowerValue, min, max)}%`,
            transform: `translate(-${getLeftPercentageOffset(lowerValue, min, max)}%)`,
          }}
        >
          <div className={styles.arrowContainer}>
            <span
              className={styles.arrow}
              style={{
                left: `${getLeftPercentageOffset(lowerValue, min, max)}%`,
                transform: `translate(-${getLeftPercentageOffset(lowerValue, min, max)}%)`,
              }}
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
          style={{
            left: `${getLeftPercentageOffset(upperValue, min, max)}%`,
            transform: `translate(-${getLeftPercentageOffset(upperValue, min, max)}%)`,
          }}
        >
          <div className={styles.arrowContainer}>
            <span
              className={styles.arrow}
              style={{
                left: `${getLeftPercentageOffset(upperValue, min, max)}%`,
                transform: `translate(-${getLeftPercentageOffset(upperValue, min, max)}%)`,
              }}
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
