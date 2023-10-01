<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Backend Exercise: Comprehensive Blog API</h1>
    <p>Hi, I hope you are doing well. Please find the documentation for the Backend Exercise: Comprehensive Blog API.</p>
    <p>All endpoints are secured with an API key. To access each endpoint, provide the key in the headers [api-key].</p>
     <h2>1. Create Blog Post (api/posts) - POST Method</h2>
    <p>For this, you have to provide all the necessary parameters in the payload.</p>
    <pre>
        Example request:
        {
            "title": "Google is quietly killing off another useful feature",
            "content": "Science and Technology",
            "category": "Basic HTML view is going to the same place that Google Stadia went: the tech graveyard in the clouds. 
            Solen Feyissa / Unsplash. This week we learned that Google is killing off Gmail’s Basic HTML view. As reported by TechCrunch, starting in January 2024, Google will disable the stripped-down HTML version of the Gmail web app and mobile web app. Ah, another Google feature bites the dust. Gmail users who regularly use the Basic HTML view are seemingly receiving an email notification, and one poster on Hacker News reports that Google says: 'We’re writing to let you know that the Gmail Basic HTML view for desktop web and mobile web will be disabled starting early January 2024. The Gmail Basic HTML views are previous versions of Gmail that were replaced by their modern successors 10+ years ago and do not include full Gmail feature functionality.",
            "category_id": "5543"
        }
    </pre>
    <pre>
        Response:
        201: New Blog post created successfully
        400: The parameter is missing; please include it in the payload
        401: You can't access any endpoints without an API key
    </pre>
   <h2>2. Get All Posts (api/posts) - GET Method</h2>
    <pre>
        Response:
        200:
        [
            {
                "_id": "651823270bb329000dc6f525",
                "title": "HOW TO STOP INSOMNIA?",
                "content": "Insomnia is a common sleep disorder that affects millions of people worldwide. It can be caused by a variety of factors, including stress, anxiety, and an uncomfortable sleep environment. If you're struggling with insomnia, there are several steps you can take to improve your sleep, including choosing the right mattress. Here are some tips to help you get over insomnia, with a focus on how your mattress can support better sleep.",
                "category": "lifestyle",
                "category_id": "3456",
                "createdAt": "2023-09-30T13:31:19.896Z",
                "updatedAt": "2023-09-30T13:31:19.896Z",
                "__v": 0
            },
            {
                "_id": "6518240f0bb329000dc6f527",
                "title": "The Future of Space Exploration: Unlocking the Mysteries of the Cosmos",
                "content": "Space exploration has captivated human imagination for centuries. From the first telescopes that revealed distant celestial bodies to the remarkable achievements of space agencies like NASA and SpaceX, our quest to unravel the mysteries of the cosmos has come a long way. In this blog, we will delve into the exciting developments and future prospects of space exploration, shedding light on how technology and human ambition are shaping the way we explore the universe.",
                "category": "Science and Technology",
                "category_id": "7654",
                "createdAt": "2023-09-30T13:35:11.128Z",
                "updatedAt": "2023-09-30T14:08:30.328Z",
                "__v": 0
            },
            {
                "_id": "651830152e49aafd726cd88a",
                "title": "Google is quietly killing off another useful feature",
                "content": "Science and Technology",
                "category": "Basic HTML view is going to the same place that Google Stadia went: the tech graveyard in the clouds. Solen Feyissa / Unsplash. This week we learned that Google is killing off Gmail’s Basic HTML view. As reported by TechCrunch, starting in January, 2024, Google will disable the stripped-down HTML version of the Gmail web app and mobile web app. Ah, another Google feature bites the dust. Gmail users who regularly use the Basic HTML view are seemingly receiving an email notification, and one poster on Hacker News reports that Google says: 'We’re writing to let you know that the Gmail Basic HTML view for desktop web and mobile web will be disabled starting early January 2024. The Gmail Basic HTML views are previous versions of Gmail that were replaced by their modern successors 10+ years ago and do not include full Gmail feature functionality.",
                "category_id": "7654",
                "createdAt": "2023-09-30T14:26:29.931Z",
                "updatedAt": "2023-09-30T14:26:29.931Z",
                "__v": 0
            }
        ]
        204: No posts
        401: You can't access any endpoints without an API key
    </pre>
    <h2>3. Get Post by ID (api/posts/:id) - GET Method</h2>
    <p>You have to provide the ID in the query parameter like api/posts/6518240f0bb329000dc6f527.</p>
    <pre>
        Example response:
        200:
        {
            "_id": "6518240f0bb329000dc6f527",
            "title": "The Future of Space Exploration: Unlocking the Mysteries of the Cosmos",
            "content": "Space exploration has captivated human imagination for centuries. From the first telescopes that revealed distant celestial bodies to the remarkable achievements of space agencies like NASA and SpaceX, our quest to unravel the mysteries of the cosmos has come a long way. In this blog, we will delve into the exciting developments and future prospects of space exploration, shedding light on how technology and human ambition are shaping the way we explore the universe.",
            "category": "Science and Technology",
            "category_id": "7654",
            "createdAt": "2023-09-30T13:35:11.128Z",
            "updatedAt": "2023-09-30T14:08:30.328Z",
            "__v": 0
        }
        204: No posts
        401: You can't access any endpoints without an API key
    </pre>
   <h2>4. Update a Particular Blog Post by ID (api/posts/:id) - PUT Method</h2>
    <p>For this, you have to provide all the necessary parameters in the payload and also provide the ID in the query parameter like api/posts/6518240f0bb329000dc6f527.</p>
    <pre>
        Example request:
        {
            "title": "Google is quietly killing off another useful feature",
            "content": "Science and Technology"
        }
    </pre>
    <pre>
        Example response:
        200:
        {
            "acknowledged": true,
            "modifiedCount": 1,
            "upsertedId": null,
            "upsertedCount": 0,
            "matchedCount": 1
        }
        400: The parameter is missing; please include it in the payload
        401: You can't access any endpoints without an API key
    </pre>
   <h2>5. Get Latest Blog Post (/post/latest) - GET Method</h2>
    <p>The success code response will contain only the latest post from unique categories.</p>
    <pre>
        Example response:
        200:
        [
            {
                "_id": "65182c4d96c16e75f6ebfec6",
                "title": "Google is quietly killing off another useful feature",
                "content": "Science and Technology",
                "category": "Basic HTML view is going to the same place that Google Stadia went: the tech graveyard in the clouds. Solen Feyissa / Unsplash. This week we learned that Google is killing off Gmail’s Basic HTML view. As reported by TechCrunch, starting in January 2024, Google will disable the stripped-down HTML version of the Gmail web app and mobile web app. Ah, another Google feature bites the dust. Gmail users who regularly use the Basic HTML view are seemingly receiving an email notification, and one poster on Hacker News reports that Google says: 'We’re writing to let you know that the Gmail Basic HTML view for desktop web and mobile web will be disabled starting early January 2024. The Gmail Basic HTML views are previous versions of Gmail that were replaced by their modern successors 10+ years ago and do not include full Gmail feature functionality.",
                "category_id": "7654",
                "createdAt": "2023-09-30T14:10:21.689Z",
                "updatedAt": "2023-09-30T14:10:21.689Z",
                "__v": 0
            },
            {
                "_id": "651823270bb329000dc6f525",
                "title": "HOW TO STOP INSOMNIA?",
                "content": "Insomnia is a common sleep disorder that affects millions of people worldwide. It can be caused by a variety of factors, including stress, anxiety, and an uncomfortable sleep environment. If you're struggling with insomnia, there are several steps you can take to improve your sleep, including choosing the right mattress. Here are some tips to help you get over insomnia, with a focus on how your mattress can support better sleep.",
                "category": "lifestyle",
                "category_id": "3456",
                "createdAt": "2023-09-30T13:31:19.896Z",
                "updatedAt": "2023-09-30T13:31:19.896Z",
                "__v": 0
            }
        ]
        401: You can't access any endpoints without an API key
    </pre>
  <h2>6. Delete Blog Post by ID - DELETE Method</h2>
    <p>You have to provide the ID in the query parameter like api/posts/6518240f0bb329000dc6f527.</p>
    <pre>
        Example response:
        200: Blog post deleted successfully
        400: Please enter the correct blog post ID
        401: You can't access any endpoints without an API key
    </pre>
</body>
</html>
