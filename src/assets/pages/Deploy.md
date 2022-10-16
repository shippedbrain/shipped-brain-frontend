# Deploying models

Create **serverless REST endpoints** for machine learning models and get **hosted web pages** instantly.

### Visit Shipped Brain's client library on [github](https://github.com/shippedbrain/shippedbrain)

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">Installation</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="installation">

`pip install shippedbrain`

</div>
</details>
</div>

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">CLI command</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="cli-command">

`shippedbrain upload --model_name My-Amazing-Model --run_id 6f252757005748708cd3aad75d1ff462`

</div>
</details>
</div>

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">Using the Python API</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="using-python-api">

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

## About _shippedbrain_

The `shippedbrain` client library provides a convenient way to publish models on [app.shippedbrain.com](app.shippedbrain.com).

It integrates with the widely used `mlflow` library, so any `mlflow` model will work on shipped brain.

</div>
</details>
</div>

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">Model Publish Workflows</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="model-publish-workflows">

There are 2 main ways in which you can publish models onto shipped brain:

-   Publish a trained model using the `shippedbrain.upload_model` function
-   Publish a model from an existing `mlfow` logged model run, via the CLI command `shippedbrain upload` or Python API using the `shippedbrain.upload_run` function

> For more information on how to log models with `mlflow`read the [documentation](https://www.mlflow.org/docs/latest/models.html)

</div>
</details>
</div>

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">Usage</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="usage">

The `shippedbrain` client library has a **Python API** and **CLI** flavors.

##### Use environment variables to set your shipped brain email and password (advised)

-   `SHIPPED_BRAIN_EMAIL`
-   `SHIPPED_BRAIN_PASSWORD`

#### Shipped Brain models signature and input example

All models published on [app.shippedbrain.com](app.shippedbrain.com) have a valid **mlflow** `input_example` and `signature`

When working with ML models you often need to know some basic functional properties of the model at hand, such as “What inputs does it expect?” and “What output does it produce?”. MLflow models can include the following additional metadata about model inputs and outputs that can be used by downstream tooling:

-   [Model Signature](https://mlflow.org/docs/latest/models.html#model-signature) - description of a model’s inputs and outputs.
-   [Model Input Example](https://mlflow.org/docs/latest/models.html#input-example) - example of a valid model input.

</div>
</details>
</div>

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">CLI</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="cli">

`shippedbrain [OPTIONS] COMMAND [ARGS]...`

#### Commands

`upload` - Deploy a model to app.shippedbrain.com : create a REST endpoint and hosted model page

#### `upload` command

Deploy a model to [app.shippedbrain.com](app.shippedbrain.com) - create a REST endpoint and get a hosted model web page

##### Options:

-   `-r`, `--run_id` (**TEXT**) - The run_id of logged mlflow model [required]
-   `-m`, `--model_name` (**TEXT**) - The model name to display on app.shippedbrain.com [required]
-   `-f`, `--flavor` (**TEXT**) - The mlflow flow flavor of the model
-   `--help` - Get help on how to use the 'upload' command

**NB:** The model must have been logged with valid `input_example` and `signature`. For more information refer to the official mlflow documentation:

-   [MLflow Model Input Example](https://mlflow.org/docs/latest/models.html#input-example)
-   [MLflow Model Signature](https://mlflow.org/docs/latest/models.html#model-signature)

##### Example:

Run:

`shippedbrain upload --run_id <some_run_id> --model_name <my-model-name>`

Prompt:

The command above will prompt the user to input their shipped brain email and password.

```
email: your@email.com
password:
```

If the environment variables `SHIPPED_BRAIN_EMAIL` or `SHIPPED_BRAIN_PASSWORD` are set, the respective prompt options will be skipped.

Example:

`shippedbrain upload --run_id 6f252757005748708cd3aad75d1ff462 --model_name Some-Model-Name`

</div>
</details>
</div>

---

<div class="markdown-details-container">
<details>
<summary>
<h1>
<span class="markdown-header-anchor">Python API</span> 
<span class="material-icons">expand_more</span>
</h1>
</summary>

<div id="python-api">

To publish a model programmatically you can either use the `shippedbrain.upload_run` or `shippedbrain.upload_model` functions.

#### `shippedbrain.upload_run`

Publish a model from an existing `mlflow` log model run.

##### Arguments:

-   `run_id` (**str**) - run_id of logged model `mlflow` run
-   `email` (**str**) - shipped brain account email; if `SHIPPED_BRAIN_EMAIL` is set, argument can be left blank
-   `password` (**str**) - shipped brain account password; if `SHIPPED_BRAIN_PASSWORD` is set, argument can be left blank
-   `model_name` (**str**) - model name to display on [app.shippedbrain.com](app.shippedbrain.com)

##### Example

```python
from shippedbrain import shippedbrain
from sklearn.ensemble import RandomForestRegressor
import mlflow

with mlflow.start_run(run_name="YOUR_RUN_NAME") as run:
  params = {"n_estimators": 5, "random_state": 42}
  sk_learn_rfr = RandomForestRegressor(**params)

  shippedbrain.upload_run(
    run_id=run.info.run_id,
    email="YOUR_EMAIL", # can be left blank if env. var. SHIPPED_BRAIN_EMAIL is set
    password="YOUR_PASSWORD", # can be left blank if env. var. SHIPPED_BRAIN_PASSWORD is set
    model_name="YOUR_MODEL_NAME"
  )
```

#### `shippedbrain.upload_model`

Publish a trained model directly to [app.shippedbrain.com](app.shippedbrain.com).

##### Arguments:

-   `flavor`: (**str**) - valid mlflow model flavor; refer to the [original mlflow documentation](https://mlflow.org/docs/latest/python_api/index.html#python-api)
-   `email` (**str**) - shipped brain account email; if "SHIPPED_BRAIN_EMAIL" is set, argument can be left blank
-   `password` (**str**) - shipped brain account password; if "SHIPPED_BRAIN_PASSWORD" is set, argument can be left blank
-   `model_name` (**str**) - model name to display on [app.shippedbrain.com](app.shippedbrain.com)
-   `input_example` (**pandas.DataFrames | numpy.ndarrays**)- model inputs can be column-based (i.e DataFrames) or tensor-based (i.e numpy.ndarrays). A model input example provides an instance of a valid model input. More info. in [MLflow Model Input Example](https://mlflow.org/docs/latest/models.html#input-example)
-   `signature` (**mlflow.types.schema.Schema**) - the Model signature defines the schema of a model’s inputs and outputs. Model inputs and outputs can be either column-based or tensor-based. Column-based inputs and outputs can be described as a sequence of (optionally) named columns with type specified. ModelSignature can be [inferred](https://mlflow.org/docs/latest/python_api/mlflow.models.html#mlflow.models.infer_signature) from training dataset and model predictions using or constructed by hand by passing an input and output [Schema](https://mlflow.org/docs/latest/python_api/mlflow.types.html#mlflow.types.Schema).

    More info in [MLflow Model Signature](https://mlflow.org/docs/latest/models.html#model-signature)

-   `**kwargs` - named arguments required by the selected `flavor`

The `kwargs` arguments depends on the `flavor` argument. Please verify the required named arguments of the select flavor in [MLflow Python API](https://mlflow.org/docs/latest/python_api/index.html#python-api).

##### Example

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
    sk_model=clf,
    artifact_path="sklearn-model"
)
```

#### Using the CLI

To upload the trained model to app.shippedbrain.com you just need to collect the `run_id` of the logged model:

-   `--model_name` - specify the model name published on app.shippedbrain.com
-   `--run_id` - the **run_id** of the logged model

Run: `shippedbrain upload --model_name ElasticWine --run_id <some_run_id>`

#### Typical workflow integration using the Python API

If `SHIPPED_BRAIN_EMAIL` and/or `SHIPPED_BRAIN_PASSWORD` are set arguments `email` and `password` can be left blank, respectively

```python
import mlflow
from shippedbrain import shippedbrain

# other imports...

SHIPPED_BRAIN_EMAIL = "your_email@mail.com"
SHIPPED_BRAIN_PASSWORD = "your_password"
MODEL_NAME = "ElasticWine"

with mlflow.start_run() as run:
    # required to upload a valid model on shipped brain
    signature =  # use mlflow.models.signature.infer_signature
    input_example =  # one input example of your data Union[pandas.DataFrame | numpy.ndarray]

    # train model
    model =  # trained model

    # log model
    mlflow.sklearn.log_model(model, "model", signature=signature, input_example=input_example)
    print(f"run_id='{run.info.run_id}'")

    # publish model
    shippedbrain.upload_run(email=SHIPPED_BRAIN_EMAIL, password=SHIPPED_BRAIN_PASSWORD, run_id=run.info.run_id,
                            model_name=MODEL_NAME)
```

</div>
</details>
</div>

---
