import * as React from "react"
import { render, screen } from "@testing-library/react"
import QuoteLoader from "./QuoteLoader.jsx"
import { expect } from "chai"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"


const stubQuoteApiRoutes = [
    http.get("https://example.com/quoteoftheday", () => {
        return HttpResponse.json({
            text: "Just do it",
        })
    }),
    http.post("https://example.com/quote", async ({ request }) => {
        const req = await request.json()

        if (req.text == undefined) {
            return new HttpResponse("Missing quote text", { status: 400 })
        }

        if (typeof req.text != "string") {
            return new HttpResponse("string required for filed text", {
                status: 400,
            })
        }

        return HttpResponse.json({ status: 204 })
    })
]

const stubQuoteApi = setupServer(...stubQuoteApiRoutes)

describe("QuoteLoader", () => {

    stubQuoteApi.listen()

    it("fetches then renders quote text", async () => {
        render(<QuoteLoader />);
        const quoteText = await screen.findByText("Just do it")
        expect(quoteText).toBeInTheDocument()
    }),

    it("shows a loading spinner while we wait", async () => {
        render(<QuoteLoader />)
        expect(await screen.getByRole("status")).toHaveTextContent(
            "Quote is loading..."
        )
    })

    it("informs the user of errors", async () => {
        stubQuoteApi.use(
            http.get(
                "https://example.com/quoteoftheday",
                () => {
                    return HttpResponse.error()
                },
                { once: true }
            )
        )

        render(<QuoteLoader />)

        expect(
            await screen.findByText("Error loading quote. Please try again later")
        ).toBeInTheDocument()
      })
})
