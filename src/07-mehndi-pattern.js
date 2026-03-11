/**
 * 🎨 Mehndi Pattern Maker - Recursion
 *
 * Mehndi artist hai tu! Intricate patterns banane hain using RECURSION.
 * Yahan loops use karna MANA hai — sirf function khud ko call karega
 * (recursive calls). Har function mein base case aur recursive case hoga.
 *
 * Functions:
 *
 *   1. repeatChar(char, n)
 *      - Repeat char n times using recursion (NO loops, NO .repeat())
 *      - Base case: n <= 0 => return ""
 *      - Recursive: char + repeatChar(char, n - 1)
 *      - Agar char not a string or empty, return ""
 *
 *   2. sumNestedArray(arr)
 *      - Sum all numbers in an arbitrarily nested array
 *      - e.g., [1, [2, [3, 4]], 5] => 15
 *      - Skip non-number values
 *      - Base case: empty array => 0
 *      - Agar input not array, return 0
 *
 *   3. flattenArray(arr)
 *      - Flatten an arbitrarily nested array into a single flat array
 *      - e.g., [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
 *      - Agar input not array, return []
 *
 *   4. isPalindrome(str)
 *      - Check if string is palindrome using recursion
 *      - Case-insensitive comparison
 *      - Base case: string length <= 1 => true
 *      - Compare first and last chars, recurse on middle
 *      - Agar input not string, return false
 *
 *   5. generatePattern(n)
 *      - Generate symmetric mehndi border pattern
 *      - n = 1 => ["*"]
 *      - n = 2 => ["*", "**", "*"]
 *      - n = 3 => ["*", "**", "***", "**", "*"]
 *      - Pattern goes from 1 star up to n stars, then back down to 1
 *      - Use recursion to build the ascending part, then mirror it
 *      - Agar n <= 0, return []
 *      - Agar n is not a positive integer, return []
 *
 * Hint: Every recursive function needs a BASE CASE (when to stop) and a
 *   RECURSIVE CASE (calling itself with a smaller/simpler input).
 *
 * @example
 *   repeatChar("*", 4)        // => "****"
 *   sumNestedArray([1, [2, [3]]]) // => 6
 *   flattenArray([1, [2, [3]]]) // => [1, 2, 3]
 *   isPalindrome("madam")     // => true
 *   generatePattern(3)        // => ["*", "**", "***", "**", "*"]
 */
export function repeatChar(char, n) {
  // Your code here
  if( typeof char !== 'string' || !char.trim() || n <= 0 ) return '';
  return char + repeatChar(char, n - 1);
}


export function sumNestedArray(arr) {
  // Your code here
  if( !Array.isArray(arr) ) return 0;
  return arr.reduce((acc, item) => {
    if( typeof item === 'number' ) return acc + item;
    return acc + sumNestedArray(item);
  }, 0);
}

export function flattenArray(arr) {
  // Your code here
  if( !Array.isArray(arr) ) return [];
  return arr.reduce((acc, item) => {
    if( Array.isArray(item) ) return acc.concat(flattenArray(item));
    return acc.concat(item);
  }, []);
}

export function isPalindrome(str) {
  // Your code here
  if( typeof str !== 'string') return false;
  if( str.length <= 1 ) return true;
  return str.toLowerCase() === str.toLowerCase().split('').reverse().join('');
}

export function generatePattern(n) {
  // Your code here
  if( n <= 0 ) return [];
  if( typeof n !== 'number' || n % 1 !== 0 ) return [];
  const pattern = [];
  for( let i = 1; i <= n; i++ ) {
    pattern.push('*'.repeat(i));
  }
  for( let i = n - 1; i >= 1; i-- ) {
    pattern.push('*'.repeat(i));
  }
  return pattern;
}