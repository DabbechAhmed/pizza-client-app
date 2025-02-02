import { renderHook,waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "../usePizzaOfTheDay";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza={
    id:"calabrese",
    name:"Calabrese",
    category:"Supreme",
    description:"Spicy salami, red chilies, mozzarella, and tomato sauce",
    image:"/public/pizzas/calabrese.webp",
    size:{S:10,M:12,L:14},
}



test("gives null when first called",async()=>{
    fetch.mockResponseOnce(JSON.stringify(testPizza));
    const {result}=renderHook(()=>usePizzaOfTheDay());
    expect(result.current).toBe(null);
})

test("to call the API and return the pizza of the day",async()=>{
    fetch.mockResponseOnce(JSON.stringify(testPizza));
    const {result}=renderHook(()=>usePizzaOfTheDay());
    await waitFor(()=>expect(result.current).toEqual(testPizza));
    expect(fetchMocker).toBeCalledWith("/api/pizza-of-the-day");

}
)