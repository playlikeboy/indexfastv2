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
		<StackHandler
			app={stack}
			fullPage={true}
			routeProps={{
				params,
				searchParams,
			}}
		/>
	);
}
