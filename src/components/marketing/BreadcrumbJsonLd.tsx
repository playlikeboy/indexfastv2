type BreadcrumbItem = {
	name: string;
	url: string;
};

type Props = {
	items: BreadcrumbItem[];
};

export function BreadcrumbJsonLd({ items }: Props) {
	const breadcrumbLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
		/>
	);
}
