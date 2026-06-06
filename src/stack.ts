import { StackServerApp } from "@stackframe/stack";

export const stack = new StackServerApp({
	tokenStore: "nextjs-cookie",
	urls: {
		signIn: "/handler/sign-in",
		signUp: "/handler/sign-up",
		afterSignIn: "/dashboard",
		afterSignUp: "/dashboard",
		afterSignOut: "/",
	},
});
