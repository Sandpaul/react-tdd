import * as React from "react";
import { render, screen } from "@testing-library/react";

import Quote from "./Quote";
import { expect } from "chai";


describe("Quote component", () => {
  it("renders heading text", () => {
    render(<Quote />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Quote of the Day"
    )
  });
  it("renders quotation passed in as a property", () => {
    render(<Quote text="Truth eludes power" />)

    expect(screen.getByText("Truth eludes power")).toBeInTheDocument()
  })

  it("has a Like button", async () => {
    const user = userEvent.setup();
  
    render(<Quote text="Optimise for Clarity" />);
  
    const likeButton = await screen.findByRole("button");
    expect(likeButton).toHaveTextContent("Like");
  });
});


