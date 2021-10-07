import { useEffect, useState } from "react";
import { SERVER_URL } from "../../config/config";
import HTTPRequest from "../../utils/request";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  useEffect(() => {
    const fetchMeals = async (url) => {
      setIsLoading(true);
      setIsError(null);
      try {
        const mealResponse = await HTTPRequest.get(url);
        if (Object.keys(mealResponse).length > 0) {
          let mealList = [];
          for (let key in mealResponse) {
            mealList.push({
              id: key,
              name: mealResponse[key].name,
              description: mealResponse[key].description,
              price: parseFloat(mealResponse[key].price),
            });
          }
          setMeals(mealList);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setIsError(err.message);
      }
    };

    fetchMeals(SERVER_URL + "/meals.json");
  }, []);

  const getMeals = () =>
    meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));

  const showElem = () => {
    if (isError) {
      return <p className={classes.error}>{isError}</p>;
    } else if (isLoading) {
      return <p className={classes.loading}>Loading...</p>;
    } else {
      return (
        <Card>
          <ul>{getMeals()}</ul>
        </Card>
      );
    }
  };

  return <section className={classes.meals}>{showElem()}</section>;
};

export default AvailableMeals;
