// action types
const LOGIN_ACTION = "LOGIN";
const LOGOUT_ACTION = "LOGOUT";
const AUTH_ACTION = "AUTH";

export const ActionType = {
	LOGIN_ACTION: LOGIN_ACTION,
	LOGOUT_ACTION: LOGOUT_ACTION,
	AUTH_ACTION: AUTH_ACTION
}

// logout reasons
export const LogoutReason = {
	UserChoice : "USER",
	WrongCredentials: "CRED",
	SessionExpired: "EXPIRED",
	ConnectionError: "NETWORK"
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
