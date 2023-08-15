export const UserGuard = async (to: any, from: any, next: any) => {
  if (
    localStorage.getItem('role') == 'ROLE_TECHNICIAN' ||
    localStorage.getItem('role') == 'ROLE_ADMIN'
  ) {
    next({ name: 'all-services' })
    return
  }

  if (localStorage.getItem('role') == 'ROLE_USER') {
    next({ name: 'user-home' })
    return
  }

  next({ name: 'login' })
  return
}
