const CHECK_AUTHENTICATION = 'CHECK_AUTHENTICATION';
const USER_IS_ADMIN = 'USER_IS_ADMIN';
const USER_ROLE_ADMIN = 'ADMIN';
const USER_ROLE_USER = 'USER';
const NOT_AUTHORIZED = 'NOACCESS';
export default {
  isLoggedIn() {
    return sessionStorage.getItem(CHECK_AUTHENTICATION) === 'true'; // Temporary Way
  },
  checkAdmin() {
    return sessionStorage.getItem(USER_IS_ADMIN) === 'true'; // Temporary Way
  },
  checkUserRole() {
    if (this.checkAdmin()) {
      return USER_ROLE_ADMIN;
    }
    if (this.isLoggedIn()) {
      return USER_ROLE_USER;
    }
    return NOT_AUTHORIZED;
  },
  checkAccess(roles) {
    if (roles == null || roles.length === 0) {
      return true;
    }

    return roles.indexOf(this.checkUserRole()) >= 0;
  },

  USER_ROLE_ADMIN,
  USER_ROLE_USER,
  NOT_AUTHORIZED,
};
