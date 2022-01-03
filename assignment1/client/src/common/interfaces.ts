export interface IItem<T> {
    item: T;
    renderer: ( item: T, index: number)=> JSX.Element; // must have key
}

export interface IPageProps {}

export interface IRestaurant {
    name: string;
    description: string;
    imageURLs: string[];
    address: IAddress;
    location: ILocation;
    cuisines: string[];
    pricePerPerson: IPrice;
}

export interface IAddress {
    buildingName: string;
    area: string;
    city: string;
    country: string;
}

export interface ILocation {
    latitute: Number;
    longitude: Number;
}

export interface IPrice {
    value: Number;
    unit: string;
};

export interface IOption {
    key: string;
    value: string;
}

export interface IDictionary {[key:string]:string;};

export interface IRoute {
    path: string;
    name: string;
    exact: boolean;
    auth: boolean;
    component: any;
    props?: any;
    navHeader?: boolean;
}

export interface IVector<T> {
    items: T[]
};
export interface IUser {
    uid: string;
    name: string;
}

export const DEFAULT_USER: IUser = {
    uid: '',
    name: ''
};

export const DEFAULT_FIRE_TOKEN = '';