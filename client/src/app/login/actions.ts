// action types
export const LOGIN_ACTION = "LOGIN";
export const LOGOUT_ACTION = "LOGOUT";
export const AUTH_ACTION = "AUTH";

// logout reasons
export const LogoutReason = {
	UserChoice : "USER",
	WrongCredentials: "CRED",
	SessionExpired: "EXPIRED"
};

// action builders
export const loginAction = (token) => {
	return {
		type: LOGIN_ACTION,
		token: token
	}
}

export const logoutAction = (reason?:string) => {
	return {
		type: LOGOUT_ACTION,
		reason: reason
	}
}

export const authAction = () => {
	return {
		type: AUTH_ACTION
	}
}
