import { StackHandler } from "@stackframe/stack";
import { stack } from "@/stack";

type HandlerPageProps = {
	params: Promise<{ stack?: string[] }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HandlerPage(props: HandlerPageProps) {
	const params = await props.params;
	const searchParams = await props.searchParams;

	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
			<StackHandler
				app={stack}
				fullPage={false}
				routeProps={{
					params,
					searchParams,
				}}
			/>
		</div>
	);
}
