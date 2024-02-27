## Getting Started

To set up to run:

```bash
npm install
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Note: This was built with on a react-next install package. 

--

Discovered Data Issues:
I had to go in and correct the JSON as it was missing commas.

There is also an invalid date on Metal Gear Solid: The Phantom Pain "2023-14-29"
which I didn't correct as there was no way to know the intended date. A nice feature,
on the entry side, would be a date validator to avoid putting garbage in the database.

For the sake of simplicity I also standardized all the image formats to webp rather than mess with getting content-type.






