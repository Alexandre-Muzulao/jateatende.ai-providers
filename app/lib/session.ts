'use client';

/**
 * Salva um token na sessão do navegador.
 * @param key - A chave para identificar o token.
 * @param value - O valor do token a ser salvo.
 */
export function saveTokenToSession(key: string, value: string): void {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem(key, value);
    } else {
        console.error('Não é possível acessar sessionStorage fora do navegador.');
    }
}
