import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const http = (path, config: RequestInit & { query?: Record<string, string> } = {}) => {
  const baseUrl = import.meta.env.DEV ? '/api' : window.location.pathname
  const originSearch = new URLSearchParams(window.location.search)
  const query = new URLSearchParams(config.query || {})
  if (originSearch.get('key')) {
    query.set('key', originSearch.get('key'))
  }
  const orign = window.location.origin
  // wapo server route only support '/' 
  const _path = path === '/' ? '' : path
  const url = new URL(`${orign}${baseUrl}${_path}?${query.toString()}`);
  const { query: _, ...withoutQuery } = config

  return fetch(url.toString(), {
    ...withoutQuery
  })
    .then(res => res.json())
}

export function mask(value: string) {
  return value.slice(0, 6) + '...' + value.slice(-6)
}

export function decodeBase64(value: string) {
  if (!value) return ''
  return atob(value)
}

export function insertReturn(value: string, pos: number) {
  return value.split('').reduce((acc, char, index) => {
    return acc + char + ((index + 1) % pos === 0 && index + 1 !== value.length ? '\r\n' : '');
  }, '');
}

export function formatPem(value: string) {
  if (!value) return ''
  return '-----BEGIN CERTIFICATE-----\r\n' + insertReturn(value, 64) + '\r\n-----END CERTIFICATE-----'
}