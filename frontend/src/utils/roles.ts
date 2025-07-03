export function isAdmin(): boolean {
  return localStorage.getItem('role') === 'admin'
}
