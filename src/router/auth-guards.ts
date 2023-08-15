export const UserGuard = async (to: any, from: any, next: any) => {
  if (
    localStorage.getItem('role') == 'ROLE_TECHNICIAN' ||
    localStorage.getItem('role') == 'ROLE_ADMIN'
  ) {
    next()
    return
  }
  next({ name: 'login' })
  return
}

export const LoginGuard = async (to: any, from: any, next: any) => {
  if (!localStorage.getItem('token_auth')) {
    next()
    return
  }
  next({ name: 'pivot' })
  return
}

export const pivot = async (to: any, from: any, next: any) => {
  if (!localStorage.getItem('role')) {
    next({ name: 'login' })
    return
  }
  if (
    localStorage.getItem('role') == 'ROLE_TECHNICIAN' ||
    localStorage.getItem('role') == 'ROLE_ADMIN'
  ) {
    next({ name: 'all-services' })
    return
  }
  next({ name: 'user-home' })
  return
}
