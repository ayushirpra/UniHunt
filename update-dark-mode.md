# Dark Mode Update Pattern

For all remaining pages, apply these systematic replacements:

## Background Colors
- `bg-white` → `bg-white dark:bg-gray-800`
- `bg-gray-50` → `bg-gray-50 dark:bg-gray-900`
- `bg-gray-100` → `bg-gray-100 dark:bg-gray-800`

## Text Colors
- `text-gray-900` → `text-gray-900 dark:text-white`
- `text-gray-800` → `text-gray-800 dark:text-gray-100`
- `text-gray-700` → `text-gray-700 dark:text-gray-300`
- `text-gray-600` → `text-gray-600 dark:text-gray-400`
- `text-gray-500` → `text-gray-500 dark:text-gray-500`
- `text-gray-400` → `text-gray-400 dark:text-gray-500`

## Border Colors
- `border-gray-200` → `border-gray-200 dark:border-gray-700`
- `border-gray-300` → `border-gray-300 dark:border-gray-600`

## Form Elements
- Input backgrounds: Add `dark:bg-gray-900`
- Input text: Add `dark:text-white`
- Input placeholders: Add `dark:placeholder:text-gray-500`
- Focus rings: Add `dark:focus:ring-indigo-400`

## Page Wrapper
- Add `transition-colors duration-300` to main wrapper
