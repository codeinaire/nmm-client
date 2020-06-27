# Project NMM Client

This is a pro bono project that I architected, designed, and implemented for the charity [No Meat May](https://www.nomeatmay.net/) (NMM). The aim of this project was to build a prototype gamified SPA to be tested on a small cohort of users during the month of May when the campaign is active.

However, Covid-19 forced NMM to quickly pivot the campaign to be friendlier to the social distancing requirements. Combined with NMM's limited resources and small volunteer base that was focused on supporting the pivot, the SPA wasn't tested with live users.

Even though it didn't go live the prototype will still be useful in applying for grants in the coming year and basis for further development of the app for next year's campaign.

### Background

The project originally started as the [final assessment](https://github.com/codeinaire/CFA-Major-Project-3-Backend) for the Diploma of Software Development I completed 3 years ago. I didn't get to finish the project. When I quit EnergyLink due to the company going into liquidation I decided it was an opportunity to finish off what I'd started.

From the perspective of No Meat May they are focused on inspiring participants to decrease their consumption of animal products while supporting and encoraging their experimentation with a plant based diet. The hope is a decrease in the or cessation of the consumption of animal products by participants. From a long-term point of view the organisers are using No Meat May as a means to empower people to live sustainably.

### UX Design

With the background in mind I designed the app to take advantage of findings in Self Determination Theory (SDT). The 4 key points of SDT are competence, motivation, autonomy, and relatedness. These four points come together in the MVP idea in which users are rewarded with points for setting a goal of how many recipes to complete, completing the recipes, and sharing the results on Facebook.

This touches on all 4 aspects of SDT. The users are motivated in setting a goal for how many recipes they can complete each week. They have the autonomy to choose which recipes to complete and at what skill level (Easy, Medium, Hard). They improve their competence at making plant based foods by completing the recipe. Finally, they touch on the relatedness aspect by taking a photo of the meal they made with friends and family to share on the NMM Facebook community page.

The users receive points for acquiring ingredients, completing the recipe, sharing the recipe on Facebook, and sharing a photo of them with the meal and other people on the Facebook community page. They get more points for sharing on Facebook so as to encourage community engagement and promotion of the campaign.

No part of process is mandatory. People can get access to the shared recipe, but if they want to access the full months recipe they have to sign up. They can get points by acquiring ingredients and making the recipe but don't have to complete the sharing. The idea is to support people with what they are comfortable doing during the campaign but encourage those who want to get more engaged.

In future iterations the points will be redeemable for NMM merchandise, and discounts at plant based partner restaurants and cafes.

### Tech Stack

[Next.js](https://github.com/vercel/next.js) - The main reasons I choose this React Framework was because it has minimal configuration while getting many good features like automatic code splitting, filesystem based routing, etc; SSR built in; and static site exporting. Also, I've had previous experience with it, making it easier to get started.

[Apollo Client](https://github.com/apollographql/apollo-client) - The most popular and supported GraphQL client. I didn't have to use GraphQL but it's a query language I wanted to learn and Apoll seemed like the best place to start. It's well documented, well supported, and can take the place of the Redux store as well.

[Auth0](https://auth0.com/) - Instead of creating my own auth system I decided to go with Auth0 after experimenting with AWS Cognito. It's much easier to use than Cognito and I don't have to worry about setting up the infrastructure. Also, under their free plan they offer a generous amount of active users. Furthermore, if the app went over the 7K limit they offer an open source charity plan that would've suited NMM's use of Auth0.

[TypeScript](https://www.typescriptlang.org/) - This is another part of the JavaScript ecosystem I wanted to learn and I'm glad I did. Using TypeScript has made developing in JS much more transparent and reduced accidental errors like typos.

[Grommet](https://v2.grommet.io/) - A responsive and accessible mobile first component library. The two important reasons for using Grommet was it's focus on accessibility and responsiveness. Plus, it looks kind of cool and I just wanted to give it a go.

[Styled Components](https://github.com/styled-components/styled-components) - Next.js uses styled-jsx, but I'm not a fan of that way of styling a component. I much prefer Styled Components way of creating a component that has styles associated with it. I'd use this infrequently only to customise Grommet components when necessary.

### Other Important Packages

[Serverless-next](https://github.com/danielcondemarin/serverless-next.js) - This is an uncomplicated, straight forward way to deploy a Next.js app onto AWS Lambda.

[face-api.js](https://github.com/justadudewhohacks/face-api.js) - This is neat packages that implements face recognition for the browser and nodejs using Tensorflow.js at its core. I used this to detect whether there were multiple faces in a photo taken by the user. This is to encourage them to take photos with more people to reinforce the relatedness aspect of SDT.

[Formik](https://github.com/formik/formik) - This deserves a special mention because it made it much easier to implement forms with react. I was able to create a generic using this package that I customised through the use of props.

[Nodemon](https://github.com/remy/nodemon) - I used this package for when I wanted to run the app using https to test the Facebook workflow.

### Improvements

- **UI Design** - The user interface is "developer design". NMM didn't have the resources to hire a UI desiger so it was left up to me. I put minimal effort into designing the look of the app. I was too focused on implementing the app itself that I didn't have time to thoughtfully consider how best to design the UI. This is an area that has dire need of improvement for the next iteration in the future.

- **Testing** - I believe testing is important, but as this is a prototype and I had limited time I didn't implement any tests in the client side of the app. This is an area that I can put more effort into improving.

### UML Use Case Diagram

![alt-tag](https://github.com/codeinaire/nmm-client/blob/update-readme/readmeImages/NMM%20UML%20Use%20Case%20Diagram.png)

### UML Activity Diagrams

#### Sign In
![alt-tag](https://github.com/codeinaire/nmm-client/blob/update-readme/readmeImages/Sign%20In%20Activity%20diagram.png)

#### Sign Up
![alt-tag](https://github.com/codeinaire/nmm-client/blob/update-readme/readmeImages/Registration%20Activity%20diagram-v2.png)

#### Recipe Feature
![alt-tag](https://github.com/codeinaire/nmm-client/blob/update-readme/readmeImages/RecipeFeatureActivityDiagram-v2.png)
