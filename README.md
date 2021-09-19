## Inspiration

One day, Bob was walking home from dinner, and realized he was ravenously hungry. As he made his way home, he pondered about what he could whip up from the leftover ingredients in his fridge. There was an overwhelming number of possibilities, and due to Bob's indecisiveness, he was unable to choose what to make and he slowly starved to death in the middle of his fully stocked kitchen.

We want to prevent such tragedies from happening, so we created Sweet&Salty to fulfill the needs of people like Bob.

## What it does

Sweet&Salty is a website for users with many ingredients but no idea what to do with them. Leveraging a database containing ~100 000 recipes and ~1 000 unique ingredients, users can easily find recipes that are doable with whatever they have on-hand. 

For the user's convenience, they may submit an initial list of ingredients they'd like to cook with, and then Sweet&Salty will make recommendations for additional ingredients with an intuitive choose-your-own-adventure design, so that the user can find a dish composed of the ingredients they want to use.

## How we built it

**Front-end**: The front-end website allows users to easily input the ingredients and is built using React and Javascript.

**Back-end**: We found a suitable [dataset](https://clickhouse.tech/docs/en/getting-started/example-datasets/recipes/) that mapped recipes to ingredients, processed the data into a usable format and uploaded it to a CockroachDB cluster. Then we used a Flask webserver to communicate with our front-end and query the database as required.

## Challenges we ran into

One challenge we ran into was finding a clean dataset that allowed us to easily query by ingredients, and give us accurate recommendations. As well, handling extremely large amounts of data and making efficient queries was another challenge we faced, along with connecting our backend to our frontend once both were functioning. Additionally, almost all members of the team were working with technologies that they were not familiar with, and so the initial learning curve was a challenge we encountered.

## What's next for Sweet&Salty
A feature that we did not have an opportunity to get to was implementing speech-to-text support for users to verbally communicate what food items they have in their fridge. This could be an additional feature that can be added to Sweet&Salty in the future
