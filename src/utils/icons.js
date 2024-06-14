export function englishVarietyToIcon(variety) {
  switch (variety) {
    case 'UK':
      return '🇬🇧';
    case 'US':
      return '🇺🇸';
    case 'AUS':
      return '🇦🇺';
    default:
      return '';
  }
}
