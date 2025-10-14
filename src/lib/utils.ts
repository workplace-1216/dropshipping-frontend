import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats currency based on language
 * @param amount - The amount to format
 * @param language - The current language ('en' or 'pt')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: string | number, language: string = 'en'): string {
  // If amount is already a formatted string with $, convert it
  if (typeof amount === 'string' && amount.includes('$')) {
    const numericValue = amount.replace(/[$,]/g, '');
    const numValue = parseFloat(numericValue);
    
    if (language === 'pt') {
      // Convert to Brazilian Real (assuming 1 USD = 5.2 BRL for demo purposes)
      const brlValue = numValue * 5.2;
      return `R$ ${brlValue.toLocaleString('pt-BR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`;
    } else {
      return `$ ${numValue.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`;
    }
  }
  
  // If amount is a number
  if (typeof amount === 'number') {
    if (language === 'pt') {
      const brlValue = amount * 5.2;
      return `R$ ${brlValue.toLocaleString('pt-BR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`;
    } else {
      return `$ ${amount.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`;
    }
  }
  
  return amount.toString();
}

