import { StackServerApp } from "@stackframe/stack";

export const stack = new StackServerApp({
	tokenStore: "cookie",
	urls: {
		signIn: "/login",
		signUp: "/signup",
		afterSignIn: "/dashboard",
		afterSignUp: "/dashboard",
		afterSignOut: "/",
	},
});
