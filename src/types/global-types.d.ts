export type Optional<T> = T | undefined | null

export interface AnyObject<T={}> extends T {
	[numAttribute: number]: any,
	[strAttribute: string]: any
}

export interface TypedMapObject<V=any, T={}> extends T {
	[numAttribute: number]: V,
	[strAttribute: string]: V
}

export interface WithChildren<T={}> extends T { 
	children?: React.ReactNode 
}


