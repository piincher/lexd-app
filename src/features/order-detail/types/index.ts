// Order Detail Feature Types

// Coordinate type for status timeline
export interface Coordinate {
	_id: string;
	latitude: number;
	longitude: number;
	location: string;
}

// Status data item for timeline
export interface StatusDataItem {
	coordinates: Coordinate[];
	_id: string;
	note: string;
	time: string;
	title: string;
	status: string;
}

// Status timeline props for air shipping
export interface StatusTimelineProps {
	statusData: StatusDataItem[];
	currentStatus:
		| "Order arrived at warehouse"
		| "Order in Processing"
		| "Order in Transit"
		| "Order in Arrived";
	location: string;
}

// Sea route item type
export interface SeaRouteItem {
	_id: string;
	title: string;
	time: string;
}

// Status timeline props for sea shipping
export interface SeaStatusTimelineProps {
	statusData: SeaRouteItem[];
	currentStatus: string;
	route: Array<{
		title?: string;
		time?: string;
	}>;
}

// Re-export shared types for convenience
export type { productType as OrderProductType } from '@src/api/order';
export type { Coordinate as SeaCoordinate, CoordinateDetails, RouteType } from '@src/api/seaRoutes';
