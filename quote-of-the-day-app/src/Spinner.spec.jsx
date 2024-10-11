import * as React from "react"
import { render, screen } from "@testing-library/react"
import Spinner from "./Spinner.jsx"

describe("Spinner", () => {
    it("shows as reason hidden accessibility text", async () => {
        render(<Spinner reason="reason for the delay" />)
        expect(await screen.getByRole("status")).toHaveTextContent(
            "reason for the delay"
        )
    })
})