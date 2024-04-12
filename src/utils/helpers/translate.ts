import translations from '@src/utils/translations';
import { Translation } from '@src/utils/types';

/**
 * Returns a translated string based on a given base string and lang code.
 * If no translation is available, the base string is returned.
 *
 * @param string
 *   An English base string.
 * @param langCode
 *   The lang code of the requested translation, optional.
 */
export default function translate(string: string, langCode: keyof Translation = 'nl'): string {
  const translatedString = (translations
    .find((translation) => translation.en === string))?.[langCode];

  return translatedString || string;
}
