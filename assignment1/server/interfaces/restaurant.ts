export interface IRestaurantSeachRequestBody {
    name?: String;
    place?: {[key: string]: string;};
    cuisine?: String;
    sortByPrice?: Number;
};

// export interface ISortParam {
//     fieldName: string;
//     isAscending?: boolean;
// };

// export interface ISearchParam {
//     keyword: string;
//     fieldName: string;
// };

// export interface IFilterParam {
//     keyword: string;
//     fieldName: string;
// };

export interface IRestaurant {
    name: string;
    description: String;
    imageURLs: String[];
    address: IAddress;
    location: ILocation;
    cuisines: String[];
    pricePerPerson: IPrice;
}

export interface IAddress {
    buildingName: String;
    area: String;
    city: String;
    country: String;
}

export interface ILocation {
    latitute: Number;
    longitude: Number;
}

export interface IPrice {
    value: Number;
    unit: String;
}