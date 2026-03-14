import React from 'react';

interface Item {
	id: string;
	title: string;
	route: string;
}

interface Props<T> {
	data: T[];
	renderItem: (item: T) => React.ReactNode;
}

export const ItemList = <T extends Item>({ data, renderItem }: Props<T>) => {
	return (
		<>
			{data.map((item) => (
				<React.Fragment key={item.id}>
					{renderItem(item)}
				</React.Fragment>
			))}
		</>
	);
};
