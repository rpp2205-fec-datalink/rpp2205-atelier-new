import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Related from "../Related.jsx";
import Slider from "../Slider.jsx";
import SliderOutfit from "../SliderOutfit.jsx";
import exampleData from "./RelatedExamples.js";
// import "../Slider.css";

const server = setupServer(
  rest.get('/related', (req, res, ctx) => {
    return res(ctx.status(200))
  })
)


beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const productIDTest = 71697;


describe('Related Component Loads', function () {
  it('should have the Related Items title', async () => {
    render(<Related productId = {productIDTest} TestID="Related"/>);
    expect(screen.getByText('Related Items')).toBeDefined();
  });
  it('should have a Build Your Outfit title', async () => {
    render(<Related productId = {productIDTest} TestID="Build Your Outfit"/>);
    expect(screen.getByText('Build Your Outfit')).toBeDefined();
  });
  it('should have a Related-Slider title', async () => {
    render(<Slider realData={exampleData.sliderExamples} TestID="Related Slider"/>);
    expect(screen.getByText('Bright Future Sunglasses')).toBeDefined();
  });

});

describe('Related Items Slider Titles', function() {
  it('should recognize the title of the second item in the slider', async () => {
   const carousel = render(<Slider realData={exampleData.sliderExamples} TestID="Related Slider"/>);
   expect(carousel.getByText("Morning Joggers"));
  });
  it('should recognize the price of the third item in the slider', async () => {
    const carousel = render(<Slider realData={exampleData.sliderExamples} TestID="Related Slider"/>);
    expect(carousel.getByText("$120.00"));
   });
});

describe('Outfit Slider Titles', function() {
  it('should recognize the title of the add to outfit card in the slider', async () => {
   const carousel = render(<SliderOutfit realData={exampleData.outfitSliderExamples} TestID="Outfit Slider"/>);
   expect(carousel.getByText("ADD THIS ITEM"));
  });
  it('should recognize the price of the second added outfit card in the slider', async () => {
    const carousel = render(<SliderOutfit realData={exampleData.outfitSliderExamples} TestID="Outfit Slider"/>);
    expect(carousel.getByText("$59.00"));
   });
});