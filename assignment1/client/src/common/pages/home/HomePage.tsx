import React, { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Restaurant/CardLayout/Card";
import { IOption, IRestaurant, IVector } from "../../interfaces";
import "./HomePage.css";
import {
  IHomePageProps,
  IHomePageState,
  INITIAL_STAGE,
} from "./HomePage.types";
import { Loading } from "../../components/Loading/Loading";
import { SearchBox } from "../../components/SerachBox/SearchBox";
import { SortButton } from "../../components/SortButton/SortButton";
import { ISearchPayload, Search } from "../../datasource/restaurant";
import { ISeachBoxState } from "../../components/SerachBox/SearchBox.types";
import logging from "../../../config/logging";
import { UserContext } from "../../components/UserContext/UserContext";

export const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const [state, setState] = useState<IHomePageState>(INITIAL_STAGE);
  const userContext = useContext(UserContext);

  useEffect(() => {
    Search(
      userContext.userState.firebase_token,
      {},
      (error: string | null, result: IRestaurant[] | null) => {
        console.log(result);
        if (error) {
          setState((prevState) => {
            return { ...prevState, restaurants: [], isLoading: false };
          });
        } else if (result) {
          setState((prevState) => {
            return {
              ...prevState,
              restaurants: result,
              isLoading: false,
            };
          });
        }
      }
    );
  }, [userContext.userState.firebase_token]);

  if (state.isLoading) {
    return <Loading message="Loading..." />;
  }

  const options: IOption[] = [
    {
      key: "restaurant",
      value: "Restaurant",
    },
    {
      key: "place",
      value: "Place",
    },
    {
      key: "cuisine",
      value: "Cuisine",
    },
  ];

  const onClickSearchButton = (event: any, searchData: ISeachBoxState) => {
    logging.info("clicked on Search");
    console.log(searchData);
    Search(
      userContext.userState.firebase_token,
      { ...getSearchPayload({ ...state, search: searchData }) },
      (error: string | null, result: IRestaurant[] | null) => {
        if (error) {
          setState((prevState) => {
            return { ...prevState, restaurants: [], search: searchData };
          });
        } else if (result) {
          setState((prevState) => {
            return {
              ...prevState,
              search: { ...searchData },
              restaurants: [...getResults(prevState.filter, result)],
            };
          });
        }
      }
    );
  };

  const onClickFilterButton = (event: any, filterData: ISeachBoxState) => {
    logging.info("clicked on Filter");
    console.log(filterData);
    Search(
      userContext.userState.firebase_token,
      { ...getSearchPayload(state) },
      (error: string | null, result: IRestaurant[] | null) => {
        if (error) {
          setState((prevState) => {
            return { ...prevState, restaurants: [], filter: { ...filterData } };
          });
        } else if (result) {
          setState((prevState) => {
            return {
              ...prevState,
              filter: { ...filterData },
              restaurants: [...getResults(filterData, result)],
            };
          });
        }
      }
    );
  };

  const onClickSortButton = (event: any, data: number) => {
    logging.info("clicked on Sort");
    console.log(data);
    Search(
      userContext.userState.firebase_token,
      { ...getSearchPayload({ ...state, sort: data }) },
      (error: string | null, result: IRestaurant[] | null) => {
        if (error) {
          setState((prevState) => {
            return { ...prevState, restaurants: [], sort: data };
          });
        } else if (result) {
          setState((prevState) => {
            return {
              ...prevState,
              sort: data,
              restaurants: [...getResults(prevState.filter, result)],
            };
          });
        }
      }
    );
  };

  const SignOut = () => {
    window.location.assign("/signout");
  };

  logging.info("Rendering HomePage");
  console.log(state);

  let results: IVector<IRestaurant>[] = [];
  for (let i = 0; i < state.restaurants.length; i += 2) {
    const items: IRestaurant[] =
      i + 1 < state.restaurants.length
        ? [{ ...state.restaurants[i] }, { ...state.restaurants[i + 1] }]
        : [{ ...state.restaurants[i] }];
    results.push({ items: [...items] });
  }
  return (
    <>
      <div className={"sticky"}>
        <SearchBox
          onClick={onClickSearchButton}
          options={options}
          buttonText="Search"
        />
        <br />
        <SearchBox
          onClick={onClickFilterButton}
          options={options}
          buttonText="Filter"
        />
        <SortButton
          onClick={onClickSortButton}
          initialState={state.sort > 0 ? "ASC" : "DSC"}
        />{" "}
        <br />
        <button className={"signoutbutton"} onClick={SignOut}>
          {"Sign Out!"}
        </button>
        <div className={"header"}>Found the following restaurants: </div>
      </div>
      <div className={"cards-wrapper"}>
        {/* {state.restaurants.map((props, index) => (
          <Card key={index.toString()} {...props} />
        ))} */}
        {results.map((result, index) => {
          return <div key={index.toString()} className={"cards-row"}>{result.items.map((props, index) => (
            <Card key={index.toString()} {...props} />
          ))}</div>;
        })}
      </div>
    </>
  );
};

const getSearchPayload = (state: IHomePageState): ISearchPayload => {
  const { search, sort } = state;
  let payload: ISearchPayload = { sortByPrice: sort > 0 ? 1 : -1 };
  if (search.keyword) {
    if (search.option === "restaurant") {
      payload = { ...payload, name: search.keyword };
    } else if (search.option === "cuisine") {
      payload = { ...payload, cuisine: search.keyword };
    } else if (search.option === "place") {
      payload = { ...payload, place: { "address.area": search.keyword } };
    }
  }
  logging.info("Search payload");
  console.log(payload);
  return payload;
};

const getResults = (filter: ISeachBoxState, restaurants: IRestaurant[]) => {
  let _restaurants: IRestaurant[] = [...restaurants];

  if (filter.keyword) {
    if (filter.option === "restaurant") {
      _restaurants = _restaurants.filter(
        (restaurant) => restaurant.name === filter.keyword
      );
    } else if (filter.option === "cuisine") {
      _restaurants = _restaurants.filter(
        (restaurant) =>
          !!restaurant.cuisines.find((cuisine) => cuisine === filter.keyword)
      );
    } else if (filter.option === "place") {
      _restaurants = _restaurants.filter(
        (restaurant) =>
          restaurant.address.area === filter.keyword ||
          restaurant.address.country === filter.keyword ||
          restaurant.address.city === filter.keyword
      );
    }
  }
  return _restaurants;
};
