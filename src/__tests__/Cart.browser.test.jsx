import { expect,test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";

test("Snapshot with nothing in cart", () => {
    const {asFragment}=render(<Cart cart={[]} />);
    expect(asFragment()).toMatchSnapshot();
}
)