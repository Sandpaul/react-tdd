import { render, screen } from "@testing-library/react";

import App from "./App";
import { describe } from "vitest";

describe("App", () => {
    it("renders headline", () => {
        render(<App title="React" />);

        screen.debug()
    })
})