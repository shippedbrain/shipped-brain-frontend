# FAQ

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">How to make predictions</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="make-predictions">

_Shipped Brain_ lets you experiment with any model on the platform fast and easily. Every model has its unique endpoint and can be accessed from anywhere.
There are three main ways to make predictions:

-   Using the UI through a model's page
-   Via command line using cURL
-   API endpoint

## Making predictions using the UI

Every model has its own web page accessible through the url `app.shippedbrain.com/<model_name>/<model_version>`.
You can make predictions directly from the model's web page using the _Try it_ button located below the model's input example.
The prediction's input data can be edited by clicking on the `Edit Values` tab that's located above the input example pane and below the model's endpoint.
To make a prediction you must be logged in.

## Using the command line via cURL

You can easily make predictions using the command line via cURL. On the model's web page select the _cURL_ tab, located below the model's API endpoint. You can copy the command already populated with an input example to your command line and start predicting right away. The model's input and output schema can be consulted on the model's web page by clicking on _Model Input Schema_ and _Model Output Schema_, respectively.
Every prediction is performed the same way for every model:

-   Make a `POST` request to the select model's endpoint: `app.shippedbrain.com/<model_name>/<model_version>`
-   Provide your authorization token `Authorization: Bearer <auth_token>`
-   Send the data that you want to make predictions from as JSON

**Example:**

```bash
curl -X POST http://app.shippedbrain.com/api/v0/predict/<model_name>/<model_version> \
-H 'accept: application/json'  \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <auth_token>' \
-d ' {"columns": ["<col_1>", ..., "<col_n>"],"data": [[v_1, ..., v_n], ...]}'
```

## Predicting using the API

All _Shipped Brain_ models have their unique API endpoint as `app.shippedbrain.com/<model_name>/<model_version>`.
Using the API is similar to using the cURL command. You can make predictions using the API endpoint by sending a `POST` request directly to the model's endpoint with the JSON data that you want to predict. The model's input and output schema can be consulted on the model's web page by clicking on _Model Input Schema_ and _Model Output Schema_ respectively.
Every prediction is performed the same way for every model:

-   Make a `POST` request to the select model's endpoint: `app.shippedbrain.com/<model_name>/<model_version>`
-   Provide your authorization token `Authorization: Bearer <auth_token>`
-   Send the data that you want to make predictions from as JSON

**Example:**
Using the **sentiment-analysis** model.

**Python**

```python
import requests

url = "https://app.shippedbrain.com/api/v0/predict/sentiment-analysis/1"

data = {
    "columns": [
        "text"
    ],
    "data": [
        ["I'm so happy"],
        ["not so good"]
    ]
}

def sentiment_analysis(data):
    results = requests.post(url, data)
    return results
```

**JavaScript**

```JavaScript
const data = {
    columns: [
        "text"
    ],
    data: [
        [ "I'm so happy" ],
        [ "not so good" ]
    ]
}

async function getSentimentAnalysis(data) {
    const url = 'https://app.shippedbrain.com/api/v0/predict/sentiment-analysis/1'
    const request = await fetch(url, { method: 'POST', body: data })
    const results = await request.json()

    return results
}

getSentimentAnalysis(data)
```

</div>

</details>
</div>

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">How to find models</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="find-models">

With _Shipped Brain_ you can find models and start using them right away. Search by name, hashtag and category. Filter by most popular, most recent and recently used.

## Searching by name, hashtag or category

Find the right model filtering by name, category or hashtag.

### Step 1

Go to the app's search bar located on the navigation menu.

### Step 2

Type your search on the app's search bar. It automatically searches for the model's name, hashtag and category.

Alternatively you can filter models directly from the [home page](https://app.shippedbrain.com) by selecting a category from the category pills.

## Finding the most popular and recent models

You can find the most popular, latest and recently used models uploaded to _Shipped Brain_.

### Step 1

Go to the [app's home page](https://app.shippedbrain.com)

### Step 2

On the left hand side click on the selection dropdown

### Step 3

Select a filter. You can filter models by:

-   Most Recent
-   Most Popular
-   Recently Used
</div>

</details>
</div>

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">How to search profiles</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="search-profiles">

Find amazing Data Scientists with a very quick search.

### Step 1

Go to the app's search bar located on the navigation menu.

### Step 2

Type the name of the profile that your searching for.

</div>

</details>
</div>

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">How to edit a model</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="edit-model">

You can edit the description and hashtags of your models anytime.
To edit a model you can go directly to the model's edit page `app.shippedbrain.com/<model_name>/edit` or go to the model's web page `app.shippedbrain.com/models/<model_name>` and click on the _Edit Model_ button, located on the top of the page on the right side of the model's name.

## Editing the model's Description

Edit the description text and click on `Save` for the changes to take effect.

## Editing model Categories

Selected model categories are displayed in magenta, while unselected categories are displayed in grey.

### Adding Categories

To add a model category click on the category you wish to add. If a category is unselected it will be displayed in grey, otherwise it will be displayed in magenta.

### Removing Categories

To remove a model category click on the category you wish to remove that is displayed in magenta.

## Editing model Hashtags

You can add and remove any model hashtag to your model.

### Adding model Hashtags

To add a hashtag type the hashtag that you want to add on the hashtag input box a click on the `+` button.

### Removing model Hashtags

To remove a hashtag click on the `x` button on the hashtag you wish to remove.

</div>

</details>
</div>

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">How to edit profile</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="edit-profile">

Provide other users with rich information about you and your work. You can improve your profile with a delightful about section and important hashtags on your areas of expertise and interest.

### Step 1

Hover your mouse over your avatar/username on the top right corner of the page header

### Step 2

Select _Account Settings_

### Step 3

Edit your _About_ text, _Name_ and _Hashtags_.

#### Editing your _About_ text

When editing your _About_ text don't forget to click _Save_.

#### Adding and deleting hashtags

To add a hashtag type the hashtag that you want to add on the hashtag input box and click on the `+` button.
To delete a hashtag click on the `x` button on the hashtag you wish to remove.

</div>

</details>
</div>

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">How to change password</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="change-password">

You can change your password at anytime through the user setting panel.
To change your password you must be logged in.

### Step 1

Hover your mouse over your avatar/username on the top right corner of the page header

### Step 2

Select _Account Settings_

### Step 3

In _New Password_ type your new password.

### Step 3

Confirm your password in _Confirm Password_

### Step 4

Click on _Save Password_ for changes to take effect.

</div>

</details>
</div>

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">I forgot my password. How do I reset it?</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="reset-password">

Whenever you forget your password you can easily recover it.

### Step 1

Got to the _Login_ page. Click on _Sign In_ on the top right corner of the app.

### Step 2

Click on _Forgot password?_.

### Step 3

Fill in your account e-mail and click on _Send Instructions_

### Step 4

Go to your e-mail inbox and follow the reset password instructions. You should have an e-mail from **info@shippedbrain.com** with a link to reset your password.

</div>

</details>
</div>

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">How to use the dashboard</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="dashboard">

Access all your statistics in one place.
Get insightful information from _Shipped Brain_ with intuitive dashboards with rich information about your models, requests and predictions.

### Step 1

Go to [your Dashboard](https://app.shippedbrain.com/dashboard)

### Step 2

Get insights from your models usage, uploads and predictions with gorgeous dashboards.

</div>

</details>
</div>

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">How to request a model</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="request-model">

Leverage the _Shipped Brain_ community to develop machine learning models that solve your problems. You can set an expiration date to your request and try the different models that the community proposes and select the model that fulfils your request and close it. You can close your request at any time.
With _Shipped Brain_ it's easy to try every model through its unique API endpoint.
To request a model you just need to fill a small form with your requirements.

### Step 1

Go to the [Model Requests page](https://app.shippedbrain.com/requests)

### Step 2

Click on the _Request model_ button on top of the model requests list

### Step 3

Fill the form displayed on the page

### Step 4

Click _Request_

### Step 5

Be notified and track your request status and model proposals.

</div>

</details>
</div>

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">How to deploy a model</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="deploy-model">

`pip install shippedbrain`

#### Using the CLI:

`shippedbrain upload --model_name My-Amazing-Model --run_id 6f252757005748708cd3aad75d1ff462`

#### Using the Python API:

Uploading a logged mlflow model from and existing `run_id` using the `shippedbrain.upload_run` function

```python
import pandas as pd
from sklearn import datasets
from sklearn.ensemble import RandomForestClassifier
import mlflow
import numpy as np
import mlflow.sklearn
from mlflow.models.signature import infer_signature

from shippedbrain import shippedbrain

iris = datasets.load_iris()
iris_train = pd.DataFrame(iris.data, columns=iris.featuhre_names)

    # each input has shape (4, 4)
input_example = np.array([
       [[  0,   0,   0,   0],
        [  0, 134,  25,  56],
        [253, 242, 195,   6],
        [  0,  93,  82,  82]],
       [[  0,  23,  46,   0],
        [ 33,  13,  36, 166],
        [ 76,  75,   0, 255],
        [ 33,  44,  11,  82]]
    ], dtype=np.uint8)

with mlflow.start_run(run_name="YOUR_RUN_NAME") as run:
    clf = RandomForestClassifier(max_depth=7, random_state=0)
    clf.fit(iris_train, iris.target)
    signature = infer_signature(iris_train, clf.predict(iris_train))
    mlflow.sklearn.log_model(clf, "iris_rf", signature=signature, input_example=input_example)


  shippedbrain.upload_run(
      run_id=run.info.run_id,
      email="YOUR_EMAIL", # can be left blank if env. var. SHIPPED_BRAIN_EMAIL is set
      password="YOUR_PASSWORD", # can be left blank if env. var. SHIPPED_BRAIN_PASSWORD is set
      model_name="YOUR_MODEL_NAME"
  )
```

Uploading a Random Forest model in scikit-learn using the `shippedbrain.upload_model` function

```python
from shippedbrain import shippedbrain
import pandas as pd
from sklearn import datasets
from sklearn.ensemble import RandomForestClassifier
from mlflow.models.signature import infer_signature

iris = datasets.load_iris()
iris_train = pd.DataFrame(iris.data, columns=iris.feature_names)
clf = RandomForestClassifier(max_depth=7, random_state=0)
clf.fit(iris_train, iris.target)

signature = infer_signature(iris_train, clf.predict(iris_train))

input_example = {
  "sepal length (cm)": 5.1,
  "sepal width (cm)": 3.5,
  "petal length (cm)": 1.4,
  "petal width (cm)": 0.2
}

# Upload the sklearn model
shippedbrain.upload_model(
    email="YOUR_EMAIL", # can be left blank if env. var. SHIPPED_BRAIN_EMAIL is set
    password="YOUR_PASSWORD", # can be left blank if env. var. SHIPPED_BRAIN_PASSWORD is set
    model_name="MODEL_NAME",
    signature=signature,
    input_example=input_example,
    sk_model=clf, # named arg. required by mlflow.sklearn.log_model
    artifact_path="sklearn-model" # named arg. required by mlflow.sklearn.log_model
)
```

Once you upload a model you'll be notified when it's finished by e-mail and get a push notification in the app.

You can track all your uploads on your [Dashboard](https://app.shippedbrain.com/dashboard).

</div>

</details>
</div>
